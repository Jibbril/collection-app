import { type Item } from '@prisma/client';
import ItemCard from './ItemCard';

interface Props {
  collectionSlug: string;
  items: Item[];
}

export default function ItemGallery({ items, collectionSlug }: Props) {
  if (!items || items.length === 0) return <div>No items found.</div>;

  return (
    <div className='flex flex-wrap justify-center'>
      {items.map((item) => (
        <ItemCard key={item.id} collectionSlug={collectionSlug} item={item} />
      ))}
    </div>
  );
}
