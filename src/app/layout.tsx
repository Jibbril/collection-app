import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang='en' className={inter.className}>
        <body>
          <Navbar />
          <div>{children}</div>
        </body>
      </html>
    </Providers>
  );
}

export const metadata = {
  title: 'Collection app',
  description: 'Collect anything, remember everything.',
};
