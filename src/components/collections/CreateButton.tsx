'use client';

import { Button } from '@/components/shadcn-ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import { Input } from '@/components/shadcn-ui/input';
import { useState } from 'react';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { addCollection, addItem } from '@/server/actions';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import TagInput from './TagInput';
import TagGrid from './TagGrid';
import { type MouseEvent } from 'react';
import { type Tag } from '@prisma/client';

interface Props {
  type: 'collection' | 'item';
  collectionId?: string;
}

export default function CreateButton({ type, collectionId }: Props) {
  const { userId } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();

  if (!userId) return null;

  const entity = type === 'collection' ? 'Collection' : 'Item';
  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    new Promise((resolve) => {
      if (type === 'collection') {
        resolve(addCollection({ name, description, userId, tags }));
      } else {
        if (!collectionId) throw new Error('No collection ID provided');
        resolve(addItem({ name, description, collectionId, userId, tags }));
      }
    })
      .then(() => {
        router.refresh();
        closeDialog();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const closeDialog = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setTags([]);
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
          <div>
            <form>
              <div>
                <Label htmlFor='name'>{entity} Name</Label>
                <Input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter collection name...'
                />
              </div>
              <div className='mt-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Enter description...'
                />
              </div>
              <div className='mt-2'>
                <Label htmlFor='tags'>Tags</Label>
                <TagInput userId={userId} tags={tags} setTags={setTags} />
                <TagGrid
                  editable={true}
                  className='mt-4'
                  tags={tags}
                  setTags={setTags}
                />
              </div>
              <DialogFooter>
                <Button
                  disabled={Boolean(!name || name === '' || loading)}
                  onClick={handleAdd}
                  className='mt-4'
                  type='submit'>
                  {loading ? (
                    <div className='flex items-center justify-center'>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Loading...
                    </div>
                  ) : (
                    <span>Create</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
