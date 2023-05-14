import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function LoginPage() {
  return (
    <div className='mt-5'>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#091C1D',
          },
        }}
        routing='path'
        path='/login'
        redirectUrl={'/collections'}
      />
    </div>
  );
}
