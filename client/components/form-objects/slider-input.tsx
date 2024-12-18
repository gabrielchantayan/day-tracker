import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

const SliderInput = ({
	id,
	label,
	form,
	value = 50,
	max_value = 100,
	step = 5,
	on_change
}: {
	id: string;
	label: string;
	form: any;
	value?: number;
	max_value?: number;
	step?: number
	on_change?: any
}) => {
	return (
		<div className={`grid w-28 md:w-60 items-center gap-4`}>
			<Label htmlFor={id}>{label}</Label>
			<div className='flex flex-row gap-2'>
				<Slider id={id} value={[value]} max={max_value} step={step} onValueChange={on_change} />
			</div>
		</div>
	);
};

export default SliderInput;
