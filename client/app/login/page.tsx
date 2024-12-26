'use client';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { useState } from 'react';

export default function Home() {

	const [otp_sent, set_otp_sent] = useState(false);
	const [email, set_email] = useState('');
	const [otp, set_otp] = useState('');
	const [error, set_error] = useState('');

	const send_otp = () => {

		if (email === '') {
			set_error('Please enter your email');
			return;
		}
		else if (!email.includes('@') || !email.includes('.')) {
			set_error('Please enter a valid email');
			return;
		}

		
		set_error('');
		set_otp_sent(true);
	};

	return (
		<div className='grid grid-rows-[1fr_80px] w-full h-screen items-center justify-center'>
			<main className='flex flex-col gap-10 w-full items-center justify-center self-center'>
				<div className=' gap-4'>
					<h1 className='text-5xl'>Login/Register</h1>
				</div>
				<div className=' gap-4 flex flex-col gap-4 items-center justify-center'>
					{otp_sent ? (
						<div className=' gap-4 flex flex-col gap-4'>
							<InputOTP maxLength={6} value={otp} onChange={set_otp}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</div>
					) : (
						<div className='gap-4 flex flex-col gap-4 w-96'>
							<Input
								placeholder='Email'
								type='email'
								value={email}
								onChange={(e) => set_email(e.target.value)}
							/>

							<Button disabled={otp_sent} onClick={send_otp}>
								Send One-Time-Password
							</Button>
						</div>
					)}
					{error && <p className='text-red-500'>{error}</p>}
				</div>
			</main>
			<Footer />
		</div>
	);
}
