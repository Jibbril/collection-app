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
import { type Item, type Collection } from '@prisma/client';
import { collectionsAtom } from '@/lib/atoms';
import { useSetAtom } from 'jotai';

interface Props {
  type: 'collection' | 'item';
  entity: Collection | Item;
  setLoading?: (loading: boolean) => void;
}

export default function EditButton({ type, entity, setLoading }: Props) {
  const setCollections = useSetAtom(collectionsAtom);

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    const fn = type === 'collection' ? deleteCollection : deleteItem;
    setLoading && setLoading(true);
    fn(entity.id)
      .then(() => {
        setCollections((prev) => prev.filter((c) => c.id !== entity.id));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading && setLoading(false));
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
