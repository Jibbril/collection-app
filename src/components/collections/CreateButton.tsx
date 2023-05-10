'use client';

import { Button } from '@/components/shadcn-ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';
import { Label } from '../shadcn-ui/label';
import { Input } from '../shadcn-ui/input';
import { useState } from 'react';
import { Textarea } from '../shadcn-ui/textarea';
import { addCollection } from '@/server/actions';
import { useAuth } from '@clerk/nextjs';

interface Props {
  type: 'collection' | 'item';
}

export default function CreateButton({ type }: Props) {
  const { userId } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('hej');

  if (!userId) return null;

  const entity = type === 'collection' ? 'Collection' : 'Item';
  const handleAdd = () => {
    if (!name || name === '') {
    } else {
      addCollection({ name, description, userId })
        .then(() => {
          console.log('success');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className='ml-2 pt-1'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='h-8 w-8 rounded-full px-1' variant='ghost'>
            <PlusCircle className='h-6 w-6' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New {entity}</DialogTitle>
            <DialogDescription>Create new {entity}</DialogDescription>
          </DialogHeader>
          <div>
            <form>
              <div>
                <Label htmlFor='name'>Collection Name</Label>
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
              <DialogFooter>
                <Button onClick={handleAdd} className='mt-4' type='submit'>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
