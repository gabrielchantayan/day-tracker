import { Input } from "../ui/input";
import { Label } from "../ui/label";

const TextInput = ({
	id,
	label,
	placeholder,
	form,
	value,
	on_change
}: {
	id: string;
	label: string;
	placeholder: string;
	form: any;
	value?: any;
	on_change?: any
}) => {




	return (
		<div className='flex flex-col w-full sm:w-52 gap-1.5'>
			<Label htmlFor={id}>{label}</Label>
			<Input type='text' id={id} placeholder={placeholder} value={value} onChange={on_change} />
		</div>
	);
};

export default TextInput;