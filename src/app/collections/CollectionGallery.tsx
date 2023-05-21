'use client';

import GalleryNotFound from '@/components/collections/GalleryNotFound';
import CollectionCard from './CollectionCard';
import { useEffect, useState } from 'react';
import { Input } from '@/components/shadcn-ui/input';
import { collectionsAtom } from '@/lib/atoms';
import { useAtomValue } from 'jotai';

export default function CollectionGallery() {
  const [query, setQuery] = useState('');
  const collections = useAtomValue(collectionsAtom);
  const [filteredCollections, setFilteredCollections] = useState(collections);

  useEffect(() => {
    if (!query || query === '') {
      setFilteredCollections(collections);
    } else {
      const filtered = collections?.filter((collection) => {
        return (
          collection.name.toLowerCase().includes(query) ||
          collection.tags.some((tag) => tag.name.toLowerCase().includes(query))
        );
      });
      setFilteredCollections(filtered);
    }
  }, [query, collections]);

  return (
    <div className='flex w-full flex-col items-center'>
      <Input
        className='border-bottom text-md my-2 border-none text-center text-gray-400 focus:placeholder-transparent focus-visible:ring-0'
        value={query}
        placeholder='Filter collections...'
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      {!filteredCollections || filteredCollections.length === 0 ? (
        <GalleryNotFound entity='collection' entityName='Collections' />
      ) : (
        <div className='flex flex-wrap justify-center'>
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
