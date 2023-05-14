import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {}

export default function Footer({}: Props) {
  return (
    <footer>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <Link href='/'>
            <h4 className='text-md font-bold'>Collec</h4>
          </Link>
          <p className='ml-4 text-center text-sm leading-loose md:text-left'>
            Built by{' '}
            <a
              href={'https://github.com/Jibbril'}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'>
              Jibbril
            </a>
            . Hosted on{' '}
            <a
              href='https://vercel.com'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'>
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
