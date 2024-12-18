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

const structure = {
	meals: {
		name: 'Meals',
		fields: {
			breakfast: {
				name: 'Breakfast',
				type: 'multi-select',
				placeholder: get_random_item('breakfast'),
			},
			lunch: {
				name: 'Lunch',
				type: 'multi-select',
				placeholder: get_random_item('lunch'),
			},
			dinner: {
				name: 'Dinner',
				type: 'multi-select',
				placeholder: get_random_item('dinner'),
			},
			snacks: {
				name: 'Snacks',
				type: 'multi-select',
				placeholder: get_random_item('snacks'),
			},
		},
	},
	substances: {
		name: 'Substances',
		fields: {
			coffee_consumed: {
				name: 'Cups of Coffee Drank',
				type: 'number',
			},
			tea_consumed: {
				name: 'Cups of Tea Drank',
				type: 'number',
			},
			alcohol_consumed: {
				name: 'Drinks',
				type: 'number',
			},
		},
	},
	life: {
		name: 'Life',
		fields: {
			places_went: {
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
					{ label: 'Outlook', value: 'Outlook'},
					{ label: "Aldi's", value: 'Aldis'},
					{ label: 'Walmart', value: 'Walmart'},
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
			productivity: {
				name: 'Productivity',
				type: 'multi-select',
			},
			excersise: {
				name: 'Excersise',
				type: 'multi-select',
			},
		},
	},
	media: {
		name: 'Media',
		fields: {
			books_read: {
				name: 'Books Read',
				type: 'multi-select',
				placeholder: get_random_item('books'),
			},
			movies_watched: {
				name: 'Movies Watched',
				type: 'multi-select',
				placeholder: get_random_item('movies'),
			},
			shows_watched: {
				name: 'Shows Watched',
				type: 'multi-select',
				placeholder: get_random_item('tv'),
			},
			games_played: {
				name: 'Games Played',
				type: 'multi-select',
				placeholder: 'Factorio',
			},
		},
	},
	language: {
		name: 'Language',
		fields: {
			duolingo_language: {
				name: 'Duolingo Language',
				type: 'text',
				placeholder: get_random_item('languages'),
			},
			duolingo_lessons: {
				name: 'Duolingo Lessons',
				type: 'number',
			},
			mango_language: {
				name: 'Mango Language',
				type: 'text',
				placeholder: get_random_item('languages'),
			},
			mango_lessons: {
				name: 'Mango Lessons',
				type: 'number',
			},
			mango_reviews: {
				name: 'Mango Reviews',
				type: 'number',
			},
		},
	},
	emotions: {
		name: 'Emotions',
		fields: {
			happiness: {
				name: 'Happiness',
				type: 'slider',
				'default-value': 75
			},
			loneliness: {
				name: 'Loneliness',
				type: 'slider',
				'default-value': 0
			},
			anxiety: {
				name: 'Anxiety',
				type: 'slider',
				'default-value': 0
			},
			anger: {
				name: 'Anger',
				type: 'slider',
				'default-value': 0
			},
			exhaustion: {
				name: 'Exhaustion',
				type: 'slider',
				'default-value': 10
			},
		},
	},
	sex: {
		name: ';)',
		fields: {
			current_woman: {
				name: 'Current Woman',
				type: 'text',
			},
			ժաժ_տվի: {
				name: 'Ժաժ տվի',
				type: 'number',
			},
			սեքս: {
				name: 'սեքս',
				type: 'number',
			},
		},
	},
};



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
