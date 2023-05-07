import CollectionCard from '@/components/collections/CollectionCard';
import { type Collection } from '@/types/collections';

interface Props {
  collections: Collection[];
  editing?: boolean;
}

export default function CollectionGallery({ collections, editing }: Props) {
  if (!collections || collections.length === 0)
    return <div>No collections found.</div>;

  return (
    <div className='flex justify-center'>
      {collections.map((collection) => (
        <CollectionCard
          editing={editing}
          key={collection.id}
          collection={collection}
        />
      ))}
    </div>
  );
}
