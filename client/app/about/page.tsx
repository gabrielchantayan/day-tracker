'use client';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<div className='grid grid-rows-[1fr_80px] w-full h-screen items-center justify-center'>
			<main className='flex flex-col gap-10 w-full items-center justify-center self-center'>
				<div className=' gap-4'>
					<h1 className='text-5xl'>What is Momentus?</h1>
				</div>
				<div className=' gap-4 flex flex-col gap-4 w-2/5'>
					<p>Momentus is an app that allows you to track your life, one day at a time.</p>
					<p>
						It was created by{' '}
						<a
							className='underline hover:underline-offset-1 hover:decoration-wavy underline-offset-2 transition-all duration-80 ease-in-out'
							href='https://gabrielchantayan.com'>
							Gabe Chantayan
						</a>{' '}
						with two main goals in mind:
					</p>
					<ol className='list-decimal list-inside pl-4'>
						<li>Remember what he did each day.</li>
						<li>Have a better understanding of his life.</li>
					</ol>

					<p>
						Gabe often struggles to remember what he did day-by-day, so he had originally kept an Excel
						spreadsheet to keep track of everything he did each day.
					</p>

					<p>
						The data was then fed into a dashboard where he could view statistics about his life; how much
						he spent, how much coffee he drank, how his mood would trend over time, ect.
					</p>

					<p>
						This proved to be an <span className='italic'>okay</span> solution for a while, but he thought
						there could be a better way.
					</p>

					<p>
						So, he created Momentus.
					</p>

					<Button
						variant={'default'}
						size={'lg'}
						className='mt-6 w-3/4 mx-auto'
						onClick={() => {
							window.location.href = '/login';
						}}>
						Get Started
					</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
