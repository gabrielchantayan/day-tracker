import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MultipleSelector from "../ui/multiple-selector";

const MultipleSelectorInput = ({
	id,
	label,
	placeholder,
	options,
	form,
}: {
	id: string;
	label: string;
	placeholder: string;
	options: any;
	form: any;
}) => {
	return (
		<div className={`grid w-full max-w-md items-center gap-1.5`}>
			<Label htmlFor={id}>{label}</Label>
			<MultipleSelector
				defaultOptions={options}
				placeholder={placeholder}
				creatable
				emptyIndicator={
					<p className='text-center leading-10 text-stone-600 dark:text-stone-400'>no results found.</p>
				}
				groupBy='group'
				{...form}
				onChange={(e) => form.setValue(id, e)}
			/>
		</div>
	);
};


export default MultipleSelectorInput;