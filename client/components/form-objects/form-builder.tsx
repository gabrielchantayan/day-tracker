import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import TextInput from './text-input';
import NumberInput from './number-input';
import MultipleSelector from '../ui/multiple-selector';
import MultipleSelectorInput from './multi-select-input';
import { Button } from '../ui/button';
import { post } from '@/app/assets/js/api';

const FormBuilder = ({ structure, form }: any) => {
	const formd = useForm();


    const handle_submit = () => {
        console.log(formd.getValues());
        post('/test', formd.getValues());
    };

	let fin = (
		<Form {...formd}>
			<form className='flex flex-col gap-5 sm:gap-3 sm:w-4/5 flex-wrap'>
				{Object.entries(structure).map(([category, items]: [string, any]) => {
					return (
						<div key={category} className='flex flex-col gap-1 sm:w-max sm:max-w-4/5'>
							<p className='font-bold text-lg'>{items.name}</p>

							<div className='flex flex-row flex-wrap gap-4 align-bottom'>
								{Object.entries(items.fields).map(([field, values]: [string, any]) => {
									return (
										<FormField
                                            key={field}
											control={formd.control}
											name={field}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														{/* this is SUCH bullshit lmfao */}

														{values.type === 'text' ? (
															<TextInput
																id={field.name}
																label={values.name}
																placeholder={values.placeholder || values.name}
																form={formd}
															/>
														) : values.type === 'number' ? (
															<NumberInput
																id={field.name}
																label={values.name}
																placeholder={values.placeholder || 0}
																form={formd}
															/>
														) : values.type === 'multi-select' ? (
                                                            <MultipleSelectorInput
                                                                id={field.name}
                                                                label={values.name}
                                                                placeholder={values.placeholder}
                                                                options={values.options}
                                                                form={formd}
                                                            />
														) : (
															<p>Not supported</p>
														)}
													</FormControl>
												</FormItem>
											)}
										/>
									);
								})}
							</div>
						</div>
					);
				})}


                <Button type='button' variant={'secondary'} onClick={handle_submit}>Submit</Button>
			</form>
		</Form>
	);

	return fin;
};

export default FormBuilder;