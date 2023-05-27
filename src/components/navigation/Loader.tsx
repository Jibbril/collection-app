import { Loader2 } from 'lucide-react';

interface Props {
  center?: boolean;
}

export default function Loading({ center }: Props) {
  if (center) {
    return (
      <div className='flex w-full flex-col items-center h-full justify-center'>
        <Loader2 className='mt-6 h-10 w-10 animate-spin' />
      </div>
    )
  }
  
  return (
    <div className='flex w-full flex-col items-center'>
      <Loader2 className='mt-6 h-10 w-10 animate-spin' />
    </div>
  );
}
