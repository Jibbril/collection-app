import { type Collection } from '@prisma/client';
import CollectionCard from './CollectionCard';

interface Props {
  collections: Collection[];
}

export default function CollectionGallery({ collections }: Props) {
  if (!collections || collections.length === 0)
    return <div>No collections found.</div>;

  return (
    <div className='flex flex-wrap justify-center'>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
