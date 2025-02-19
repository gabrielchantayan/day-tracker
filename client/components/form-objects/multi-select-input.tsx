import { Label } from "../ui/label";
import MultipleSelector from "../ui/multiple-selector";

const MultipleSelectorInput = ({
	id,
	label,
	placeholder,
	options,
	max_width,
	form,
	value,
	on_change
}: {
	id: string;
	label: string;
	placeholder: string;
	options: any;
	max_width: number;
	form: any;
	value?: any;
	on_change?: any
}) => {
	return (
		<div className={`flex flex-col w-full sm:max-w-52 gap-1.5`}>
			<Label htmlFor={id}>{label}</Label>
			<MultipleSelector
				defaultOptions={options}
				placeholder={placeholder}
				creatable
				hidePlaceholderWhenSelected
				hideClearAllButton
				emptyIndicator={
					<p className='text-center leading-10 text-stone-600 dark:text-stone-400'>no results found.</p>
				}
				groupBy='group'
				// {...form}
				// onChange={(e) => form.setValue(id, e)}
				onChange={on_change}
				value={value}
			/>
		</div>
	);
};


export default MultipleSelectorInput;