'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import EntityForm from './EntityForm';

interface Props {
  type: 'collection' | 'item';
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
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isCollection = type === 'collection';
  const entity = isCollection ? 'Collection' : 'Item';

  if (!userId) return null;

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div className='ml-2 pt-1'>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className='h-8 w-8 rounded-full px-1'
            variant='ghost'>
            <PlusCircle className='h-6 w-6' />
          </Button>
        </DialogTrigger>
        <DialogContent
          onCloseClick={() => closeDialog()}
          onInteractOutside={(e) => {
            if (loading) e.preventDefault();
            else closeDialog();
          }}
          onEscapeKeyDown={(e) => {
            if (loading) e.preventDefault();
            else closeDialog();
          }}>
          <DialogHeader>
            <DialogTitle>New {entity}</DialogTitle>
            <DialogDescription>Create new {entity}</DialogDescription>
          </DialogHeader>
          <EntityForm
            type={type}
            formDefaults={formDefaults}
            userId={userId}
            collectionId={collectionId}
            loading={loading}
            setLoading={setLoading}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
