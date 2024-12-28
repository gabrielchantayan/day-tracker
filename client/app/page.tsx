'use client';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function Home() {


	return (
		<div className='grid grid-rows-[1fr_80px] h-screen'>
			<main className='flex flex-col gap-20 items-center justify-center'>
				<div className='text-center gap-4'>
					<h1 className='text-8xl'>Momentus</h1>
					<p className='text-xl'>Track your life, one day at a time</p>
				</div>
				<div className='text-center gap-4 flex flex-col gap-8'>
					<Button variant={'glass'} size={'lg'} onClick={() => {
							window.location.href = '/login';
						}}>
						Get Started
					</Button>

					<Button variant={'ghost'} size={'lg'} onClick={() => { window.location.href = '/about' }}>
						What is Momentus?
					</Button>
				</div>
			</main>
			<Footer	/>
		</div>
	);
}
