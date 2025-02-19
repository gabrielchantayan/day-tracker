import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

const SliderInput = ({
	id,
	label,
	form,
	value = 0,
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
		<div className={`flex flex-col w-full md:w-60 gap-1.5`}>
			<div className='flex flex-row justify-between'>
				<Label className='text-stone-100' htmlFor={id}>{label}</Label>
				<p className='text-stone-400 text-sm m-0'>{value/10}/{max_value/10}</p>
			</div>
			<div className='flex flex-row gap-2'>
				<Slider id={id} value={[value]} max={max_value} step={step} onValueChange={on_change} />
			</div>
		</div>
	);
};

export default SliderInput;
