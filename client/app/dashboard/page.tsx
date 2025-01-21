import { cookies } from 'next/headers';
import DownloadDataForm from './inc/download-data-form';


export default async function Home() {
	const cookieStore = await cookies();

	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			{/* <header className='bg-stone-400 dark:bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Momentus</div>
			</header> */}
			<main className='min-h-screen px-20 py-20'>
                <p className='text-4xl'>Dashboard</p>
                <div>
                    <DownloadDataForm />
                </div>
			</main>
		</div>
	);
}
