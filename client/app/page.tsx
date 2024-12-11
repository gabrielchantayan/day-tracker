'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import random_items from './random-items.json';
import TextInput from '@/components/form-objects/text-input';
import NumberInput from '@/components/form-objects/number-input';

import FormBuilder from '@/components/form-objects/form-builder';



const structure = {
	meals: {
		name: 'Meals',
		fields: {
			breakfast: {
				name: 'Breakfast',
				type: 'text',
			},
			lunch: {
				name: 'Lunch',
				type: 'text',
			},
			dinner: {
				name: 'Dinner',
				type: 'text',
			},
			snacks: {
				name: 'Snacks',
				type: 'text',
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
			},
			movies_watched: {
				name: 'Movies Watched',
				type: 'text',
			},
			shows_watched: {
				name: 'Shows Watched',
				type: 'text',
			},
			games_played: {
				name: 'Games Played',
				type: 'text',
			}
		},
	},
};



export default function Home() {
	const form = useForm();

	const get_random_item = (item: keyof typeof random_items) => {
		return random_items[item][Math.floor(Math.random() * random_items[item].length)];
	};

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


				<Form {...form}>
					<form>
						<div className='flex flex-col gap-1'>
							<p className='font-bold text-lg'>Meals</p>
							<div className='flex flex-row flex-wrap gap-4 '>
								<FormField
									control={form.control}
									name='breakfast'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='breakfast'
													label='Breakfast'
													placeholder={get_random_item('breakfast')}
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='lunch'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='lunch'
													label='Lunch'
													placeholder={get_random_item('lunch')}
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='dinner'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='dinner'
													label='Dinner'
													placeholder={get_random_item('dinner')}
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='snacks'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='snacks'
													label='Snacks'
													placeholder={get_random_item('snacks')}
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>


						<div className='flex flex-col gap-1'>
							<p className='font-bold text-lg'>Life</p>
							<div className='flex flex-row flex-wrap gap-4 '>
								<FormField
									control={form.control}
									name='places-went'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<MultipleSelector
													defaultOptions={[
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
													]}
													placeholder='Type places you went today'
													creatable
													emptyIndicator={
														<p className='text-center leading-10 text-gray-600 dark:text-gray-400'>
															no results found.
														</p>
													}
													groupBy='group'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='productivity'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='productivity'
													label='What productive things did I do today?'
													placeholder='Ironed clothes, programmed'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='exercise'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='exercise'
													label='Exercise'
													placeholder='Went for a walk'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

		

						<div className='flex flex-col gap-1'>
							<p className='font-bold text-lg'>Language</p>
							<div className='flex flex-row flex-wrap gap-4 '>
								<FormField
									control={form.control}
									name='duolingo-language'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='duolingo-language'
													label='Duolingo Language'
													placeholder='French'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='duolingo-lessons'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<NumberInput
													id='duolingo-lessons'
													label='Duolingo Lessons'
													placeholder='2'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='mango-language'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='mango-language'
													label='Mango Language'
													placeholder='French'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='mango-lessons'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<NumberInput
													id='mango-lessons'
													label='Mango Lessons'
													placeholder='2'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='mango-reviews'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<NumberInput
													id='mango-reviews'
													label='Mango Reviews'
													placeholder='2'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='font-bold text-lg'>{';)'}</p>
							<div className='flex flex-row flex-wrap gap-4 '>
								<FormField
									control={form.control}
									name='woman'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextInput
													id='woman'
													label='Current կին'
													placeholder='who is it'
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='Ժաժ տվի'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<NumberInput id='ժաժ տվի' label='Ժաժ տվի' placeholder='0' field={field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='սեքս'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<NumberInput id='սեքս' label='Սեքս' placeholder='0' field={field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<Button type='button' onClick={form.handleSubmit(handle_submit)}>Submit</Button>
					</form>
				</Form>
			</main>
		</div>
	);
}
