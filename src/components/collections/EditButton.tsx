'use client';

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
import { deleteCollection, deleteItem } from '@/server/actions';
import { useRouter } from 'next/navigation';
import { type Item, type Collection } from '@prisma/client';

interface Props {
  type: 'collection' | 'item';
  entity: Collection | Item;
}

export default function EditButton({ type, entity }: Props) {
  const router = useRouter();
  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    const fn = type === 'collection' ? deleteCollection : deleteItem;
    fn(entity.id)
      .then(() => router.refresh())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 h-6 w-6 rounded-full p-0 '>
            <MoreVertical className='h-4 w-4' />
            <span className='sr-only'>Edit {type}</span>
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
