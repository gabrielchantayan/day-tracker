'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TextInput from '@/components/form-objects/text-input';
import NumberInput from '@/components/form-objects/number-input';

import FormBuilder from '@/components/form-objects/form-builder';
import { format_date, get_date } from './assets/js/utils';
import { useState } from 'react';

const date_selector_classes =
	'underline italic underline-offset-2 hover:underline-offset-3 transition-all duration-100 hover:cursor-pointer hover:decoration-wavy';

const structure = [
	{
		name: 'Meals',
		fields: [
			{
				name: 'Breakfast',
				type: 'multi-select',
			},
			{
				name: 'Lunch',
				type: 'multi-select',
			},
			{
				name: 'Dinner',
				type: 'multi-select',
			},
			{
				name: 'Snacks',
				type: 'multi-select',
			},
		],
	},
	{
		name: 'Substances',
		fields: [
			{
				name: 'Cups of Coffee Drank',
				type: 'number',
			},
			{
				name: 'Cups of Tea Drank',
				type: 'number',
			},
			{
				name: 'Drinks',
				type: 'number',
			},
		],
	},
	{
		name: 'Life',
		fields: [
			{
				name: 'Places Went',
				type: 'multi-select',
				placeholder: 'Type to add places',
				options: [
					{
						label: 'Epic Universe',
						value: 'Epic Universe',
					},
					{
						label: 'Commodity',
						value: 'Commodity',
					},
					{ label: 'Outlook', value: 'Outlook' },
					{ label: "Aldi's", value: 'Aldis' },
					{ label: 'Walmart', value: 'Walmart' },
					{
						label: "Austin's Coffee",
						value: 'Austins Coffee',
					},
					{
						label: "Zach and Julia's",
						value: 'Zach and Julias',
					},
				],
			},
			{
				name: 'Productivity',
				type: 'multi-select',
			},
			{
				name: 'Excersise',
				type: 'multi-select',
			},
		],
	},
	{
		name: 'Media',
		fields: [
			{
				name: 'Books Read',
				type: 'multi-select',
			},
			{
				name: 'Movies Watched',
				type: 'multi-select',
			},
			{
				name: 'Shows Watched',
				type: 'multi-select',
			},
			{
				name: 'Games Played',
				type: 'multi-select',
			},
		],
	},
	{
		name: 'Language',
		fields: [
			{
				name: 'Duolingo Language',
				type: 'text',
			},
			{
				name: 'Duolingo Lessons',
				type: 'number',
			},
			{
				name: 'Mango Language',
				type: 'text',
			},
			{
				name: 'Mango Lessons',
				type: 'number',
			},
			{
				name: 'Mango Reviews',
				type: 'number',
			},
		],
	},
	{
		name: 'Emotions',
		fields: [
			{
				name: 'Happiness',
				type: 'slider',
				'default-value': 75,
			},
			{
				name: 'Loneliness',
				type: 'slider',
				'default-value': 0,
			},
			{
				name: 'Anxiety',
				type: 'slider',
				'default-value': 0,
			},
			{
				name: 'Anger',
				type: 'slider',
				'default-value': 0,
			},
			{
				name: 'Exhaustion',
				type: 'slider',
				'default-value': 10,
			},
			{
				name: 'Stress',
				type: 'slider',
				'default-value': 5,
			},
		],
	},
	{
		name: ';)',
		fields: [
			{
				name: 'Current Woman',
				type: 'text',
			},
			{
				name: 'Ժաժ տվի',
				type: 'number',
			},
			{
				name: 'սեքս',
				type: 'number',
			},
		],
	},
];

const generate_default_values = (structure: any) => {
	const default_values: any = {};
	structure.forEach((category: any) => {
		category.fields.forEach((field: any) => {
			if (field.type === 'number') {
				default_values[field.name] = 0;
			} else if (field.type === 'text') {
				default_values[field.name] = '';
			} else if (field.type === 'multi-select') {
				default_values[field.name] = [];
			}
		});
	});
	return default_values;
};

export default function Home() {
	const form = useForm();

	const [delta, set_delta] = useState(0);

	const handle_submit = () => {
		// Get all the values from the form
		const values = form.getValues();
		console.log(values);
	};

	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			<header className='bg-stone-400 dark:bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Day Tracker</div>
			</header>
			<main className='flex flex-col gap-6 px-10 py-5 sm:px-20 sm:py-10 w-full md:w-4/5'>
				<div className='flex flex-col gap-2 w-fit'>
					<h1 className='text-6xl font-light'>{format_date(get_date(delta)).toLocaleLowerCase()}</h1>
					<div className='flex flex-row justify-between'>
						<div className={date_selector_classes} onClick={() => set_delta(delta - 1)}>
							{format_date(get_date(-1 + delta)).toLocaleLowerCase()}
						</div>
						<div className={date_selector_classes} onClick={() => set_delta(delta + 1)}>
							{format_date(get_date(1 + delta)).toLocaleLowerCase()}
						</div>
					</div>
				</div>

				<FormBuilder structure={structure} form={form} date={get_date(delta)} />
			</main>
		</div>
	);
}
