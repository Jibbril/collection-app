import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/footer';

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
    <ClerkProvider>
      <html lang='en' className={inter.className}>
        <body>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata = {
  title: 'Collection app',
  description: 'Collect anything, remember everything.',
};
