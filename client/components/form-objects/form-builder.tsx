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
import { useEffect } from 'react';

const FormBuilder = ({ structure, form }: any) => {
	const formd = useForm();

	const get_data_from_server = async (date: string) => {
		const res = await post(['data', 'get_data'], { user: 'me@gabrielchantayan.com', date: date });

		if (res.success) {

			console.log('res success', res);

			formd.reset(res.data.data);
		}
	};

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

	useEffect(() => {
		get_data_from_server(get_current_date());
	}, []);

	let fin = (
		<Form {...formd}>
			<form className='flex flex-col gap-5 sm:gap-3 flex-wrap'>

		

				{structure.map((category: any) => {
					return (
						<div key={category.name} className='flex flex-wrap flex-col gap-1'>
							<p className='font-bold text-lg'>{category.name}</p>

							<div className='flex flex-row flex-wrap gap-4 align-bottom'>
								{category.fields.map((values: any, i: number) => {
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
															placeholder={values.placeholder || values.name}
															form={formd}
															value={value}
															on_change={onChange}
														/>
													) : values.type === 'number' ? (
														<NumberInput
															id={values.item_field}
															label={values.name}
															placeholder={values.placeholder || 0}
															form={formd}
															value={value}
															on_change={onChange}
														/>
													) : values.type === 'multi-select' ? (
														<MultipleSelectorInput
															id={values.item_field}
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

				<Button type='button' variant={'secondary'} onClick={handle_submit}>
					Submit
				</Button>
			</form>
		</Form>
	);

	return fin;
};

export default FormBuilder;
