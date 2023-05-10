'use client';

import { type Collection } from '@/types/collections';
import { type MouseEvent } from 'react';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { deleteCollection } from '@/server/actions';

interface Props {
  type: 'collection' | 'item';
  collection: Collection;
}

export default function EditButton({ type, collection }: Props) {
  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    deleteCollection(collection.id)
      .then(() => {
        console.log('deleted');
        // TODO: refresh collections after delete
        // revalidatePath('/collections')
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 h-6 w-6 rounded-full p-0 '>
            <MoreVertical className='h-4 w-4' />
            <span className='sr-only'>Edit collection {collection.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Edit className='mr-2 h-4 w-4' />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <Trash2 className='mr-2 h-4 w-4' />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
