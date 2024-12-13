import { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const NumberInput = ({
	id,
	label,
	placeholder,
	width = "44",
	form,
}: {
	id: string;
	label: string;
	placeholder: string;
	width?: number;
	form: any;
}) => {


	return (
		<div className={`grid w-28 md:w-40 items-center gap-1.5`}>
			<Label htmlFor={id}>{label}</Label>
			<div className='flex flex-row gap-2'>
				{/* <Button type='button' variant={'secondary'} onClick={subtract_one}>
					-
				</Button> */}
				<Input
					type='number'
					id={id}
					placeholder={placeholder}
					{...form}
					onChange={(e) => form.setValue(id, e.target.value)}
				/>
				{/* <Button type='button' variant={'secondary'} onClick={add_one}>
					+
				</Button> */}
			</div>
		</div>
	);
};

export default NumberInput;
