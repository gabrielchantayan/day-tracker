'use client';

import TextInput from "./text-input";
import NumberInput from "./number-input";
import { Controller } from "react-hook-form";
import { useState } from "react";
import TextWithNumbersInput from "./text-with-numbers-input";
import { Button } from "../ui/button";

const MultiTextWithNumbersInput = ({
	id,
	label,
	numbers_content,
	placeholder,
	form,
	value = 0,
	on_change
}: {
	id: string;
	label: string;
	numbers_content: [{ name: string }];
	form: any;
	placeholder: string;
	value?: number;
	on_change?: any
}) => {

const [content, set_content] = useState<React.ReactNode[]>([]);

	const add = () => {
		set_content([...content, <TextWithNumbersInput addition={`${content.length}`} id={id} label={label} numbers_content={numbers_content} placeholder={placeholder} form={form} value={value} on_change={on_change} />]);
	};

	

	return (
		<div className={`flex flex-col w-full gap-1.5`}>

			{content.map((item, index) => {
				return item;
			})}
			<div className='flex flex-row gap-2'>
				<Button type='button' variant={'glass'} onClick={() => add()}>
					Add
				</Button>
			</div>

		</div>
	);
};

export default MultiTextWithNumbersInput;
