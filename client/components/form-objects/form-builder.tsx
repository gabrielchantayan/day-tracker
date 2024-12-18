import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import TextInput from './text-input';
import NumberInput from './number-input';
import MultipleSelector from '../ui/multiple-selector';
import MultipleSelectorInput from './multi-select-input';
import { Button } from '../ui/button';
import { post } from '@/app/assets/js/api';
import { get_current_date } from '@/app/assets/js/utils';
import { Slider } from '../ui/slider';
import SliderInput from './slider-input';
import { Controller } from 'react-hook-form';

const FormBuilder = ({ structure, form }: any) => {
	const formd = useForm();

	const handle_submit = () => {
		console.log(formd.getValues());

		let current_date = get_current_date();
		let current_user = 'me@gabrielchantayan.com';

		post(['data', 'update_data'], {
			user: current_user,
			date: current_date,
			data: { ...formd.getValues() },
		});
	};

	let fin = (
		<Form {...formd}>
			<form className='flex flex-col gap-5 sm:gap-3 flex-wrap'>
				{Object.entries(structure).map(([category, items]: [string, any]) => {
					return (
						<div key={category} className='flex flex-wrap flex-col gap-1'>
							<p className='font-bold text-lg'>{items.name}</p>

							<div className='flex flex-row flex-wrap gap-4 align-bottom'>
								{Object.entries(items.fields).map(([item_field, values]: [string, any]) => {
									return (
										<Controller
											key={item_field}
											control={formd.control}
											name={item_field}
											render={({ field: { onChange, onBlur, value, ref } }) => (
												<>
													{values.type === 'text' ? (
														<TextInput
															id={item_field}
															label={values.name}
															placeholder={values.placeholder || values.name}
															form={formd}
															value={value}
															on_change={onChange}
														/>
													) : values.type === 'number' ? (
														<NumberInput
															id={item_field}
															label={values.name}
															placeholder={values.placeholder || 0}
															form={formd}
															value={value}
															on_change={onChange}
														/>
													) : values.type === 'multi-select' ? (
														<MultipleSelectorInput
															id={item_field}
															label={values.name}
															placeholder={values.placeholder}
															options={values.options}
															form={formd}
															max_width={values['max-width'] || 'md'}
															value={value}
															on_change={onChange}
														/>
													) : values.type === 'slider' ? (
														<SliderInput
															id={item_field}
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
									// return (
									// 	<FormField
									// 		key={field}
									// 		control={formd.control}
									// 		name={field}
									// 		render={({ field }) => (
									// 			<FormItem>
									// 				<FormControl>
									// 					{/* this is SUCH bullshit lmfao */}

									// 					{values.type === 'text' ? (
									// 						<TextInput
									// 							id={field.name}
									// 							label={values.name}
									// 							placeholder={values.placeholder || values.name}
									// 							form={formd}
									// 						/>
									// 					) : values.type === 'number' ? (
									// 						<NumberInput
									// 							id={field.name}
									// 							label={values.name}
									// 							placeholder={values.placeholder || 0}
									// 							form={formd}
									// 						/>
									// 					) : values.type === 'multi-select' ? (
									// 						<MultipleSelectorInput
									// 							id={field.name}
									// 							label={values.name}
									// 							placeholder={values.placeholder}
									// 							options={values.options}
									// 							form={formd}
									// 							max_width={values['max-width'] || 'md'}
									// 						/>
									// 					) : values.type === 'slider' ? (
									// 						<SliderInput
									// 							id={field.name}
									// 							label={values.name}
									// 							form={formd}
									// 							default_value={values['default-value']}
									// 							max_value={values['max-value']}
									// 							step={values.step}
									// 						/>
									// 					) : (
									// 						<p>Not supported</p>
									// 					)}
									// 				</FormControl>
									// 			</FormItem>
									// 		)}
									// 	/>
									// );
								})}
							</div>
						</div>
					);
				})}

				<Button type='button' variant={'secondary'} onClick={handle_submit}>
					Submit
				</Button>
			</form>
		</Form>
	);

	return fin;
};

export default FormBuilder;
