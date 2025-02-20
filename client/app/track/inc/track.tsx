'use client';

import { useForm } from 'react-hook-form';
import { CalendarIcon } from '@radix-ui/react-icons';
import FormBuilder from '@/components/form-objects/form-builder';
import { format_date, get_date } from '../../assets/js/utils';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { post } from '@/app/assets/js/api';

const date_selector_classes =
	'underline italic underline-offset-2 hover:underline-offset-3 transition-all duration-100 hover:cursor-pointer hover:decoration-wavy';


export default function Track({token, email} : any) {
	const form = useForm();

	const [delta, set_delta] = useState(0);

	const [struc, set_struc] = useState({
		loading: true,
		structure: [],
	});


	const change_date = (d: any) => {
		let current_date = new Date(get_date());
		let new_date = new Date(d);
		let triangle = (new_date.getTime() - current_date.getTime()) / (1000 * 3600 * 24);
		set_delta(triangle);
	};

	const get_structure = async () => {


		const res = await post(['structure', 'get_structure'], {
			user: email,
			token: token
		});

		if (res.success) {


			set_struc({
				loading: false,
				structure: res.data.structure,
			});
		}
	};

	
	useEffect(() => {
		get_structure();
	}, []);


	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			{/* <header className='bg-stone-400 dark:bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Momentus</div>
			</header> */}
			<div className='flex flex-col gap-6 px-10 py-10 sm:px-20 sm:py-10 w-full md:w-4/5'>
				<div className='flex flex-col gap-2 w-full sm:w-fit sm:items-start items-center'>
					<h1 className='text-5xl sm:text-6xl font-bold font-[family-name:var(--font-ss)]'>
						{format_date(get_date(delta)).toLocaleLowerCase()}
					</h1>
					<div className='w-full flex flex-row gap-2'>
						<Popover>
							<PopoverTrigger>
								<p className='cursor-pointer text-6xl'>
									<CalendarIcon className='w-5 h-5 hover:scale-110 transition-all duration-100' />
								</p>
							</PopoverTrigger>
							<PopoverContent className='ml-10'>
								<Calendar
									mode='single'
									onSelect={(d: any) => change_date(d)}
									selected={new Date(get_date(delta)) }
									defaultMonth={new Date(get_date(delta))}
								/>
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

				{!struc.loading ? (
					<FormBuilder structure={struc.structure} form={form} date={get_date(delta)} />
				) : (
					<div>Loading</div>
				)}
			</div>
		</div>
	);
}
