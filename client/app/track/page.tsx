'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from '@radix-ui/react-icons';
import FormBuilder from '@/components/form-objects/form-builder';
import { format_date, get_date } from '../assets/js/utils';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import Footer from '@/components/footer';

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
				type: 'break',
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
			},
			{
				name: 'Loneliness',
				type: 'slider',
			},
			{
				name: 'Anxiety',
				type: 'slider',
			},
			{
				name: 'Anger',
				type: 'slider',
			},
			{
				name: 'Exhaustion',
				type: 'slider',
			},
			{
				name: 'Stress',
				type: 'slider',
			},
			{
				name: 'Mania',
				type: 'slider',
			},
		],
	},
	{
		name: ';)',
		fields: [
			{
				name: 'Current Woman',
				type: 'multi-select',
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
	// {
	// 	name: 'Other',
	// 	fields: [
	// 		{
	// 			name: 'Duolingo Language',
	// 			type: 'multi-text-with-numbers',
	// 			numbers_content : [
	// 				{
	// 					name: 'Duolingo Lessons',
	// 				}
	// 			]
	// 		},
	// 	],
	// },
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

	const change_date = (d: Date) => {
		let current_date = new Date(get_date());
		let new_date = new Date(d);
		let triangle = (new_date.getTime() - current_date.getTime()) / (1000 * 3600 * 24);
		set_delta(triangle);
	};

	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			{/* <header className='bg-stone-400 dark:bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Momentus</div>
			</header> */}
			<main className='flex flex-col gap-6 px-10 py-5 sm:px-20 sm:py-10 w-full md:w-4/5'>
				<div className='flex flex-col gap-2 w-fit'>
					<h1 className='text-6xl font-bold font-[family-name:var(--font-rl-madena)]'>{format_date(get_date(delta)).toLocaleLowerCase()}</h1>
					<div className='w-full flex flex-row gap-2'>
						<Popover>
							<PopoverTrigger>
								<p className='cursor-pointer text-6xl'>
									<CalendarIcon className='w-5 h-5 hover:scale-110 transition-all duration-100' />
								</p>
							</PopoverTrigger>
							<PopoverContent className='ml-10'>
								<Calendar mode='single' onSelect={(d: Date) => change_date(d)} />
							</PopoverContent>
						</Popover>
						<div className='flex flex-row justify-between w-full'>
							<div className={date_selector_classes} onClick={() => set_delta(delta - 1)}>
								{format_date(get_date(-1 + delta)).toLocaleLowerCase()}
							</div>
							<div className={date_selector_classes} onClick={() => set_delta(delta + 1)}>
								{format_date(get_date(1 + delta)).toLocaleLowerCase()}
							</div>
						</div>
					</div>
				</div>

				<FormBuilder structure={structure} form={form} date={get_date(delta)} />
			</main>
		</div>
	);
}
