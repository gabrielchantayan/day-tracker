import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import TextInput from './text-input';
import NumberInput from './number-input';
import MultipleSelector from '../ui/multiple-selector';
import MultipleSelectorInput from './multi-select-input';
import { Button } from '../ui/button';
import { post } from '@/app/assets/js/api';
import { get_date } from '@/app/assets/js/utils';
import { Slider } from '../ui/slider';
import SliderInput from './slider-input';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import random_items from '@/components/form-objects/random-items.json';
import TextWithNumbersInput from './text-with-numbers-input';
import MultiTextWithNumbersInput from './multi-text-with-numbers-input';
import { get_user } from '@/app/assets/js/auth';

const get_random_item = (item: keyof typeof random_items) => {
	return random_items?.[item]?.[Math.floor(Math.random() * random_items[item].length)] || null;
};

const FormBuilder = ({ structure, form, date = get_date() }: any) => {
	const formd = useForm();

	/**
	 * Generate default values for form fields based on their types.
	 *
	 * This function iterates through the provided structure and assigns default values
	 * to each field based on its type. Supported field types are 'number', 'text', and 'multi-select'.
	 *
	 * @param {Array} structure - The form structure containing categories and fields.
	 * @returns {Object} - An object containing field names as keys and their default values.
	 */
	const generate_default_values = (structure: any) => {
		const default_values: any = {};
		structure.forEach((category: any) => {
			category.fields.forEach((field: any) => {
				// Assign default value based on field type
				if (field.type === 'number') {
					default_values[field.name] = 0;
				} else if (field.type === 'text') {
					default_values[field.name] = '';
				} else if (field.type === 'multi-select') {
					default_values[field.name] = [];
				}
			});
		});
		console.log(default_values);
		return default_values;
	};

	/**
	 * Merge two objects, where the second object takes precedence.
	 *
	 * The two objects are merged into a single object, with the second object taking
	 * precedence over the first object. If the two objects have the same key, the
	 * value from the second object will be used.
	 *
	 * @param {Object} high - The first object.
	 * @param {Object} low - The second object.
	 * @return {Object} - The merged object.
	 */
	const merge_with_priority = (high: any, low: any): any => {
		return { ...high, ...low };
	};

	/**
	 * Get the data from the server for the given date.
	 *
	 * This function will send a POST request to the server with the user's email and token,
	 * and the given date. The server will then return the data associated with the user
	 * and the given date.
	 *
	 * The function will then reset the form with the data from the server. If the server
	 * returns an error, the function will reset the form with the default values.
	 *
	 * @param date The date to get the data for.
	 */
	const get_data_from_server = async (date: string) => {
		// Get the current user info
		const user_info = await get_user();

		// Send a POST request to the server with the user's email and token, and the given date
		const res = await post(['data', 'get_data'], { user: user_info.email, token: user_info.token, date: date });

		// If the server returns success, reset the form with the data from the server
		if (res.success) {
			formd.reset(merge_with_priority(generate_default_values(structure), res.data.data));
		} else {
			// If the server returns an error, reset the form with the default values
			formd.reset(generate_default_values(structure));
		}
	};

	/**
	 * Handle the form submission.
	 *
	 * This function is called when the user submits the form.
	 * It will send a POST request to the server with the form data.
	 */
	const handle_submit = async () => {
		// Get the current user info
		const user_info = await get_user();

		// Get the current date
		let current_date = date;

		// Get the current user and token
		let current_user = user_info.email;
		let token = user_info.token;

		// Send the POST request
		await post(['data', 'update_data'], {
			// Send the current user, token, and date
			user: current_user,
			token: token,
			date: current_date,
			// Send the form data
			data: { ...formd.getValues() },
		});
	};

	useEffect(() => {
		get_data_from_server(date);
	}, [date]);

	let fin = (
		<Form {...formd}>
			<form className='flex flex-col gap-5 sm:gap-3 flex-wrap'>
				{structure.map((category: any) => {
					return (
						<div key={category.name} className='flex flex-wrap flex-col gap-1 '>
							<p className='font-bold text-lg'>{category.name}</p>

							<div className='flex flex-row flex-wrap gap-4 align-bottom'>
								{category.fields.map((values: any, i: number) => {
									if (values.type === 'multi-text-with-numbers') {
										return (
											<MultiTextWithNumbersInput
												id={values.name}
												label={values.name}
												placeholder={
													values.placeholder || get_random_item(values.name) || values.name
												}
												form={formd}
												numbers_content={values.numbers_content}
											/>
										);
									} else if (values.type === 'break') {
										return <div className='w-96'></div>;
									} else
										return (
											<Controller
												key={i}
												control={formd.control}
												name={values.name}
												render={({ field: { onChange, onBlur, value, ref } }) => (
													<>
														{values.type === 'text' ? (
															<TextInput
																id={values.item_field}
																label={values.name}
																placeholder={
																	values.placeholder ||
																	get_random_item(values.name) ||
																	values.name
																}
																form={formd}
																value={value}
																on_change={onChange}
															/>
														) : values.type === 'number' ? (
															<NumberInput
																id={values.item_field}
																label={values.name}
																placeholder={values.placeholder || 0}
																// form={formd}
																value={value}
																on_change={onChange}
															/>
														) : values.type === 'multi-select' ? (
															<MultipleSelectorInput
																id={values.item_field}
																label={values.name}
																placeholder={
																	values.placeholder ||
																	get_random_item(values.name) ||
																	values.name
																}
																options={values.options}
																form={formd}
																max_width={values['max-width'] || 'md'}
																value={value}
																on_change={onChange}
															/>
														) : values.type === 'slider' ? (
															<SliderInput
																id={values.item_field}
																label={values.name}
																form={formd}
																value={value}
																on_change={onChange}
															/>
														) : (
															<p>Not supported</p>
														)}
													</>
												)}
											/>
										);
								})}
							</div>
						</div>
					);
				})}

				<Button type='button' variant={'glass'} onClick={handle_submit}>
					Save Changes
				</Button>
			</form>
		</Form>
	);

	return fin;
};

export default FormBuilder;
