'use client';

import { type Collection } from '@/types/collections';
import { type MouseEvent } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { MoreVertical } from 'lucide-react';

interface Props {
  type: 'collection' | 'item';
  collection: Collection;
}

export default function EditButton({ type, collection }: Props) {
  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Edit ${collection.name}`);
  };

  return (
    <div>
      <Button
        onClick={handleEdit}
        variant='ghost'
        className='absolute right-2 top-2 h-6 w-6 rounded-full p-0 '>
        <MoreVertical className='h-4 w-4' />
        <span className='sr-only'>Edit collection {collection.name}</span>
      </Button>
    </div>
  );
}
