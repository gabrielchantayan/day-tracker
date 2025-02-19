import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const rlMadena = localFont({
	src: './fonts/RL-Madena.woff2',
	variable: '--font-ss',
	weight: '100 900',
});


export const metadata: Metadata = {
  title: "Day Tracker",
  description: "Track your day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body
				// className={`${geistSans.variable} ${geistMono.variable} ${rlMadena.variable} antialiased bg-gradient-to-r from-[#E3FDF5] to-[#FFE6FA]`}>
				className={`${geistSans.variable} ${geistMono.variable} ${rlMadena.variable} antialiased bg-stone-800 text-white`}>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					{/* <div className='bg-gradient-to-r from-[#ddd6f3] to-[#faaca8] fixed inset-0 -z-10 w-screen h-screen h-full animate-breathing'>
					</div> */}

					{children}
				</ThemeProvider>
			</body>
		</html>
  );
}
