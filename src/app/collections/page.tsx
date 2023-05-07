'use client';

import CollectionGallery from '@/components/collections/CollectionGallery';
import useSWR from 'swr';
import { fetcher } from '@/lib/db';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type Collection } from '@/types/collections';
import { Button } from '@/components/shadcn-ui/button';
import { Check, Edit } from 'lucide-react';

export default function CollectionsPage() {
  const [editing, setEditing] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const { userId } = useAuth();

  if (!userId) return redirect('/login');

  const { data, isLoading, error } = useSWR(
    `/api/collections?userId=${userId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setCollections(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='flex items-center'>
        <h1 className='font-heading mb-2 mt-4 text-4xl lg:text-5xl'>
          Collections
        </h1>
        <Button
          onClick={() => setEditing(!editing)}
          variant='outline'
          className='ml-2 mt-2 h-8 w-8 rounded-full p-0'>
          {editing ? (
            <Check className='h-4 w-4' />
          ) : (
            <Edit className='h-4 w-4' />
          )}
          <span className='sr-only'>Toggle editing collections</span>
        </Button>
      </div>

      <CollectionGallery editing={editing} collections={collections} />
    </div>
  );
}
