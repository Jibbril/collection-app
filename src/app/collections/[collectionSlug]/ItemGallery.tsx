'use client';

import GalleryFilter from '@/components/collections/GalleryFilter';
import ItemCard from './ItemCard';
import GalleryNotFound from '@/components/collections/GalleryNotFound';
import { itemsAtom } from '@/lib/atoms';
import { filterEntities } from '@/lib/formatters';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

interface Props {
  collectionSlug: string;
}

export default function ItemGallery({ collectionSlug }: Props) {
  const items = useAtomValue(itemsAtom);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(filterEntities(query, items));
  }, [query, items]);

  return (
    <div className='flex w-full flex-col items-center'>
      <GalleryFilter entity={'items'} query={query} setQuery={setQuery} />

      {!filteredItems || filteredItems.length === 0 ? (
        <GalleryNotFound entity='item' entityName='Items' />
      ) : (
        <div className='flex flex-wrap justify-center'>
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              collectionSlug={collectionSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
