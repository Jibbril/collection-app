'use client';

import { Button } from '@/components/shadcn-ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import EntityDialog from './EntityDialog';
import { type Entity } from '@/types/collections';

interface Props {
  type: Entity;
  collectionId?: string;
}

const formDefaults = {
  name: '',
  description: '',
  link: '',
  linkValid: true,
  tags: [],
};

export default function CreateButton({ type, collectionId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className='ml-2 pt-1'>
      <EntityDialog
        open={open}
        setOpen={setOpen}
        type={type}
        formDefaults={formDefaults}
        collectionId={collectionId}>
        <Button
          onClick={() => setOpen(true)}
          className='h-8 w-8 rounded-full px-1'
          variant='ghost'>
          <PlusCircle className='h-6 w-6' />
        </Button>
      </EntityDialog>
    </div>
  );
}
