'use client';

import GalleryNotFound from '@/components/collections/GalleryNotFound';
import CollectionCard from './CollectionCard';
import { useEffect, useState } from 'react';
import { collectionsAtom } from '@/lib/atoms';
import { useAtomValue } from 'jotai';
import { filterEntities } from '@/lib/formatters';
import GalleryFilter from '@/components/collections/GalleryFilter';

export default function CollectionGallery() {
  const collections = useAtomValue(collectionsAtom);
  const [query, setQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState(collections);

  useEffect(() => {
    setFilteredCollections(filterEntities(query, collections));
  }, [query, collections]);

  return (
    <div className='flex w-full flex-col items-center'>
      <GalleryFilter entity={'collections'} query={query} setQuery={setQuery} />

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
