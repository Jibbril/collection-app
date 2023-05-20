import GalleryNotFound from '@/components/collections/GalleryNotFound';
import CollectionCard from './CollectionCard';
import { type CollectionWithTags } from '@/types/collections';

interface Props {
  collections: CollectionWithTags[];
}

export default function CollectionGallery({ collections }: Props) {
  if (!collections || collections.length === 0)
    return <GalleryNotFound entity='collection' entityName='Collections' />;

  return (
    <div className='flex flex-wrap justify-center'>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
