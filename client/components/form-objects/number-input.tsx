import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const NumberInput = ({
	id,
	label,
	placeholder,
	width = 40,
	field,
}: {
	id: string;
	label: string;
	placeholder: string;
	width?: number;
	field: any;
}) => {
	return (
		<div className={`grid w-full max-w-${width} items-center gap-1.5`}>
			<Label htmlFor={id}>{label}</Label>
			<div className='flex flex-row gap-2'>
				<Button type='button' variant={'secondary'}>
					-
				</Button>
				<Input type='number' id={id} placeholder={placeholder} {...field} />
				<Button type='button' variant={'secondary'}>
					+
				</Button>
			</div>
		</div>
	);
};


export default NumberInput