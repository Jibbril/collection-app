import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function LoginPage() {
  return (
    <div className='mt-5 flex justify-center'>
      <SignIn routing='path' path='/login' redirectUrl={'/collections'} />
    </div>
  );
}
