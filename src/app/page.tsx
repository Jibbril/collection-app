import { Mail } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { UserButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <>
      <Button>
        <Mail className='mr-2 h-4 w-4' /> Login with Email
      </Button>
      <div>
        <UserButton />
      </div>
    </>
  );
}
