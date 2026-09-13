import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Vishal Deep — Software Engineer & AI Systems Builder',
  description:
    'MCA candidate in Generative AI at SRM University. Full-stack software engineer shipping AI-integrated products. Currently building at Smartground Infotech.',
  keywords: ['Vishal Deep', 'Software Engineer', 'Full Stack Developer', 'AI', 'Generative AI', 'Next.js', 'React', 'Portfolio'],
  authors: [{ name: 'Vishal Deep', url: 'https://github.com/VishalDeep1377' }],
  creator: 'Vishal Deep',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Vishal Deep — Software Engineer & AI Systems Builder',
    description: 'MCA in Generative AI · Full-stack engineer shipping AI products.',
    siteName: 'Vishal Deep Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishal Deep — Software Engineer',
    description: 'MCA in Generative AI · Full-stack engineer.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head />
      <body>{children}</body>
    </html>
  );
}
