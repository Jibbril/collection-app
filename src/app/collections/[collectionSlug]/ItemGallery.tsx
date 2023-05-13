import ItemCard from './ItemCard';
import GalleryNotFound from '@/components/collections/GalleryNotFound';
import { type ItemWithTags } from '@/types/collections';

interface Props {
  collectionSlug: string;
  items: ItemWithTags[];
}

export default function ItemGallery({ items, collectionSlug }: Props) {
  if (!items || items.length === 0) return <GalleryNotFound entity='item' entityName='Items' />;

  return (
    <div className='flex flex-wrap justify-center'>
      {items.map((item) => (
        <ItemCard key={item.id} collectionSlug={collectionSlug} item={item} />
      ))}
    </div>
  );
}
