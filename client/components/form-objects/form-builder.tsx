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

const get_random_item = (item: keyof typeof random_items) => {
	return random_items?.[item]?.[Math.floor(Math.random() * random_items[item].length)] || null;
};

const FormBuilder = ({ structure, form, date = get_date() }: any) => {
	const formd = useForm();

	const generate_default_values = (structure: any) => {
		const default_values: any = {};
		structure.forEach((category: any) => {
			category.fields.forEach((field: any) => {
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

	const merge_with_priority = (high: any, low: any) => {
		return { ...high, ...low };
	};

	const get_data_from_server = async (date: string) => {
		const res = await post(['data', 'get_data'], { user: 'me@gabrielchantayan.com', date: date });

		if (res.success) {
			console.log('pm', merge_with_priority(generate_default_values(structure), res.data.data));

			formd.reset(merge_with_priority(generate_default_values(structure), res.data.data));
		} else {
			formd.reset(generate_default_values(structure));
		}
	};

	const handle_submit = () => {
		console.log(formd.getValues());

		let current_date = date;
		let current_user = 'me@gabrielchantayan.com';

		post(['data', 'update_data'], {
			user: current_user,
			date: current_date,
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
														placeholder={values.placeholder || get_random_item(values.name) || values.name}
														form={formd}
														numbers_content={values.numbers_content}
													/>
											
											
										);
									}

									else if (values.type === 'break') {
										return (
											<div className='w-96'></div>
										);
									}


									else return (
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
													) 
													: values.type === 'slider' ? (
														<SliderInput
															id={values.item_field}
															label={values.name}
															form={formd}
															value={value}
															on_change={onChange}
														/>
													) 
													: 
													(
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

				<Button type='button' variant={'secondary'} onClick={handle_submit}>
					Save Changes
				</Button>
			</form>
		</Form>
	);

	return fin;
};

export default FormBuilder;
