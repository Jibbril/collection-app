import Footer from '@/components/navigation/footer';
import { footerHeight, navbarHeight } from '@/lib/data';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const height = `calc(100vh - ${navbarHeight} - ${footerHeight})`;
  return (
    <div className='flex w-full flex-col'>
      <div
        style={{ height }}
        className='flex w-full items-center justify-center'>
        {children}
      </div>
      <Footer />
    </div>
  );
}
