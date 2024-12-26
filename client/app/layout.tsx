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
	variable: '--font-rl-madena',
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
			<body className={`${geistSans.variable} ${geistMono.variable} ${rlMadena.variable} antialiased bg-stone-100 dark:bg-stone-900`}>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
  );
}
