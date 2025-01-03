
import { Button } from '@/components/ui/button';

import { cookies } from 'next/headers';
import Track from './inc/track';
import { get_user, is_logged_in } from '../assets/js/auth';

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


	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			{/* <header className='bg-stone-400 dark:bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Momentus</div>
			</header> */}
			<main className=''>
				<Track token={cookies().get('user-token')?.value} email={cookies().get('user-email')?.value} />
			</main>
		</div>
	);
}
