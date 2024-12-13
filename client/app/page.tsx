'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import random_items from './random-items.json';
import TextInput from '@/components/form-objects/text-input';
import NumberInput from '@/components/form-objects/number-input';

import FormBuilder from '@/components/form-objects/form-builder';

const get_random_item = (item: keyof typeof random_items) => {
	return random_items[item][Math.floor(Math.random() * random_items[item].length)];
};

const structure = {
	meals: {
		name: 'Meals',
		fields: {
			breakfast: {
				name: 'Breakfast',
				type: 'text',
				placeholder: get_random_item('breakfast'),
			},
			lunch: {
				name: 'Lunch',
				type: 'text',
				placeholder: get_random_item('lunch'),
			},
			dinner: {
				name: 'Dinner',
				type: 'text',
				placeholder: get_random_item('dinner'),
			},
			snacks: {
				name: 'Snacks',
				type: 'text',
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
						value: 'epic-universe',
						group: 'Work',
					},
					{
						label: 'Commodity',
						value: 'universal-commodity',
						group: 'Work',
					},
					{ label: 'Outlook', value: 'universal-outlook', group: 'Work' },
					{ label: "Aldi's", value: 'aldis', group: 'Stores' },
					{ label: 'Walmart', value: 'walmart', group: 'Stores' },
					{
						label: "Austin's Coffee",
						value: 'austins-coffee',
						group: 'Social',
					},
					{
						label: "Zach and Julia's",
						value: 'zach-and-julias',
						group: 'Social',
					},
				],
			},
			productivity: {
				name: 'Productivity',
				type: 'text',
			},
			excersise: {
				name: 'Excersise',
				type: 'text',
			},
		},
	},
	media: {
		name: 'Media',
		fields: {
			books_read: {
				name: 'Books Read',
				type: 'text',
				placeholder: get_random_item('books'),
			},
			movies_watched: {
				name: 'Movies Watched',
				type: 'text',
				placeholder: get_random_item('movies'),
			},
			shows_watched: {
				name: 'Shows Watched',
				type: 'text',
				placeholder: get_random_item('tv'),
			},
			games_played: {
				name: 'Games Played',
				type: 'text',
				placeholder: 'Factorio',
			}
		},
	},
	language: {
		name: 'Language',
		fields: {
			duolingo_language: {
				name: 'Duolingo Language',
				type: 'text',
				placeholder: get_random_item('languages')
			},
			duolingo_lessons: {
				name: 'Duolingo Lessons',
				type: 'number',
			},
			mango_language: {
				name: 'Mango Language',
				type: 'text',
				placeholder: get_random_item('languages')
			},
			mango_lessons: {
				name: 'Mango Lessons',
				type: 'number',			
			},
			mango_reviews: {
				name: 'Mango Reviews',
				type: 'number',
			}
		}
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
			}
		}
	}
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
			<header className='bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Day Tracker</div>
			</header>
			<main className='flex flex-col gap-6 px-10 py-5 sm:px-20 sm:py-10 w-full md:w-3/4'>

				<FormBuilder structure={structure} form={form} />

			</main>
		</div>
	);
}
