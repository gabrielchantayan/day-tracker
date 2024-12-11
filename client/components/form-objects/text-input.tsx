import { Input } from "../ui/input";
import { Label } from "../ui/label";

const TextInput = ({
	id,
	label,
	placeholder,
	field,
}: {
	id: string;
	label: string;
	placeholder: string;
	field: any;
}) => {
	return (
		<div className='grid w-full max-w-sm items-center gap-1.5'>
			<Label htmlFor={id}>{label}</Label>
			<Input type='text' id={id} placeholder={placeholder} {...field} />
		</div>
	);
};

export default TextInput;