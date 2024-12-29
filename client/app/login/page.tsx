'use client';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { useState } from 'react';
import { post } from '../assets/js/api';
import { login } from '../assets/js/auth';

export default function Home() {

	const [otp_sent, set_otp_sent] = useState(false);
	const [email, set_email] = useState('');
	const [otp, set_otp] = useState('');
	const [error, set_error] = useState('');



	const resend_otp = async () => {
		const res = await post(['auth', 'resend-otp'], {
			email: email,
		});
	};

	const verify_otp = async () => {
		const res = await post(['account', 'login'], {
			email: email,
			otp: otp,
		});

		if (res.success) {
			await login(res.data.email, res.data.token, res.data.name);
			window.location.href = '/track';
		} else {
			set_otp_sent(res.message);
		}
	};

	

	const send_otp = async () => {

		if (email === '') {
			set_error('Please enter your email');
			return;
		}
		else if (!email.includes('@') || !email.includes('.')) {
			set_error('Please enter a valid email');
			return;
		}

		const res = await post(['auth', 'generate-otp'], {
			email: email,
		});

		if (res.success) {
			set_otp_sent(true);
		}
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

							<div className=' gap-4 flex flex-row justify-between'>
								<Button variant="glass_secondary" onClick={verify_otp}>Login</Button>
							<Button variant="glass_secondary" onClick={resend_otp}>Resend OTP</Button>
							</div>
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
