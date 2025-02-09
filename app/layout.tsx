import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mahdi Hazrati - Frontend Developer',
  description: 'Portfolio website of Mahdi Hazrati, a frontend developer specializing in React and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://platform.analytick.ir/script.js" data-website-id="6e1f33d4-5218-4121-acdf-9b46fc249d82"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}