import { cookies } from 'next/headers';
import Track from './inc/track';



export default async function Home() {

	  const cookieStore = await cookies();


	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			{/* <header className='bg-stone-400 dark:bg-stone-700 p-2'>
				<div className='dark:text-white text-lg font-bold ml-2'>Momentus</div>
			</header> */}
			<main className=''>
				<Track token={cookieStore.get('user-token')?.value} email={cookieStore.get('user-email')?.value} />
			</main>
		</div>
	);
}
