'use client';

import { type Item, type Collection } from '@prisma/client';
import { useState, type MouseEvent } from 'react';
import {
  type EntityWithTags,
  type Entity,
  type ItemWithTags,
} from '@/types/collections';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { deleteCollection, deleteItem } from '@/server/actions';
import { collectionsAtom, itemsAtom } from '@/lib/atoms';
import { useSetAtom } from 'jotai';
import EntityDialog from './EntityDialog';

interface Props {
  type: Entity;
  entity: EntityWithTags;
  setLoading?: (loading: boolean) => void;
}

export default function CardOptions({ type, entity, setLoading }: Props) {
  const setCollections = useSetAtom(collectionsAtom);
  const setItems = useSetAtom(itemsAtom);
  const [open, setOpen] = useState(false);
  const isCollection = type === 'collection';

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    const fn = isCollection ? deleteCollection : deleteItem;
    setLoading && setLoading(true);
    fn(entity.id)
      .then(() => {
        if (isCollection) {
          setCollections((prev) => prev.filter((c) => c.id !== entity.id));
        } else {
          setItems((prev) => prev.filter((i) => i.id !== entity.id));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading && setLoading(false));
  };

  const formDefaults = {
    name: entity.name,
    description: entity.description || '',
    tags: entity.tags,
    link: '',
    linkValid: true,
  };

  const isItem = (entity: EntityWithTags): entity is ItemWithTags =>
    (entity as Item).collectionId !== undefined;

  if (isItem(entity)) {
    formDefaults.link = entity.link || '';
  }

  const collectionId = isCollection
    ? (entity as Collection).id
    : (entity as Item).collectionId;

  return (
    <div>
      <EntityDialog
        editing={true}
        open={open}
        setOpen={setOpen}
        type={type}
        collectionId={collectionId}
        formDefaults={formDefaults}>
        {/* pass menu item as trigger for EntityDialog */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 rounded-full p-0 '>
              <MoreVertical className='h-4 w-4' />
              <span className='sr-only'>Edit {type}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}>
              <Edit className='mr-2 h-4 w-4' />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </EntityDialog>
    </div>
  );
}
