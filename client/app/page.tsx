'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import random_items from './random-items.json';
import TextInput from '@/components/form-objects/text-input';
import NumberInput from '@/components/form-objects/number-input';

import FormBuilder from '@/components/form-objects/form-builder';
import { format_date, get_current_date } from './assets/js/utils';

const get_random_item = (item: keyof typeof random_items) => {
	return random_items[item][Math.floor(Math.random() * random_items[item].length)];
};

const structure = [
	{
		name: 'Meals',
		fields: [
			{
				name: 'Breakfast',
				type: 'multi-select',
				placeholder: get_random_item('breakfast'),
			},
			{
				name: 'Lunch',
				type: 'multi-select',
				placeholder: get_random_item('lunch'),
			},
			{
				name: 'Dinner',
				type: 'multi-select',
				placeholder: get_random_item('dinner'),
			},
			{
				name: 'Snacks',
				type: 'multi-select',
				placeholder: get_random_item('snacks'),
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
				placeholder: get_random_item('books'),
			},
			{
				name: 'Movies Watched',
				type: 'multi-select',
				placeholder: get_random_item('movies'),
			},
			{
				name: 'Shows Watched',
				type: 'multi-select',
				placeholder: get_random_item('tv'),
			},
			{
				name: 'Games Played',
				type: 'multi-select',
				placeholder: 'Factorio',
			},
		],
	},
	{
		name: 'Language',
		fields: [
			{
				name: 'Duolingo Language',
				type: 'text',
				placeholder: get_random_item('languages'),
			},
			{
				name: 'Duolingo Lessons',
				type: 'number',
			},
			{
				name: 'Mango Language',
				type: 'text',
				placeholder: get_random_item('languages'),
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

export default function Home() {
	const form = useForm();

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
				<h1 className='text-6xl font-light'>{format_date(get_current_date()).toLocaleLowerCase()}</h1>

				<FormBuilder structure={structure} form={form} />
			</main>
		</div>
	);
}
