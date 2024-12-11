import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import TextInput from "./text-input";
import NumberInput from "./number-input";

const FormBuilder = ({structure, form} : any) => {
	const formd = useForm();


    let fin = 
		<Form {...formd}>
            <form>
                {Object.entries(structure).map(([category, items]: [string, any]) => {
                    return (
                    <div className='flex flex-col gap-1 w-max'>
                        <p className='font-bold text-lg'>{items.name}</p>

                        <div className='flex flex-row flex-wrap gap-4 '>


                            {Object.entries(items.fields).map(([field, values]: [string, any]) => {
                                return (
                                    <FormField
                                        control={formd.control}
                                        name={field}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>

                                                    {/* this is SUCH bullshit lmfao */}


                                                    {
                                                        (values.type === 'text') ? (
                                                            <TextInput id={field} label={values.name} placeholder={'ddd'} {...field} />
                                                        ) : (
                                                            (values.type === 'number') ? (
                                                                <NumberInput id={field} label={values.name} placeholder={'ddd'} {...field} />
                                                            ) : (
                                                                <p>Not supported</p>
                                                            )
                                                        )
                                                    }


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
            </form>
		</Form>
	

    console.log(structure)

    // for (const [key, value] of Object.entries(structure)) {
    //     console.log(value)
    //     fin.push(
	// 		<div className='flex flex-col gap-1'>
	// 			<p className='font-bold text-lg'>{value.name}</p>
    //             <div className='flex flex-row flex-wrap gap-4 '>

    //                 {Object.entries(value.fields).map(([key2, value2]) => {
    //                     return (
    //                         <FormField
    //                             control={form.control}
    //                             name={key2}
    //                             render={({ field }) => (
    //                                 <FormItem>
    //                                     <FormControl>
    //                                         <TextInput id={key} label={value2.name} placeholder={'ddd'} field={field} />
    //                                     </FormControl>
    //                                 </FormItem>
    //                             )}
    //                         />
    //                     );
    //                 })}


    //             </div>
	// 		</div>
	// 	);
    // }

    return fin;
    
}

export default FormBuilder;


{/* <div className='flex flex-col gap-1'>
	<p className='font-bold text-lg'>Meals</p>
	<div className='flex flex-row flex-wrap gap-4 '>
		<FormField
			control={form.control}
			name='breakfast'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<TextInput
							id='breakfast'
							label='Breakfast'
							placeholder={get_random_item('breakfast')}
							field={field}
						/>
					</FormControl>
				</FormItem>
			)}
		/>

		<FormField
			control={form.control}
			name='lunch'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<TextInput id='lunch' label='Lunch' placeholder={get_random_item('lunch')} field={field} />
					</FormControl>
				</FormItem>
			)}
		/>

		<FormField
			control={form.control}
			name='dinner'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<TextInput id='dinner' label='Dinner' placeholder={get_random_item('dinner')} field={field} />
					</FormControl>
				</FormItem>
			)}
		/>

		<FormField
			control={form.control}
			name='snacks'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<TextInput id='snacks' label='Snacks' placeholder={get_random_item('snacks')} field={field} />
					</FormControl>
				</FormItem>
			)}
		/>
	</div>
</div>; */}