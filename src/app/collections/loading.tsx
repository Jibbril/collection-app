import { Loader2 } from 'lucide-react';

export default function ComponentName() {
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='mb-2 mt-4 flex items-center'>
        <h1 className='font-heading text-4xl lg:text-5xl'>Collections</h1>
      </div>
      <Loader2 className='mt-6 h-10 w-10 animate-spin' />
    </div>
  );
}
