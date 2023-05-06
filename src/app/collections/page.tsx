import { dbQuery } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { type Collection } from '@/types/collections';
import { type ExecutedQuery } from '@planetscale/database';
import CollectionCard from '@/components/collections/CollectionCard';

export default async function CollectionsPage() {
  const user = await currentUser();
  if (!user) return redirect('/login');

  const data: ExecutedQuery = await dbQuery(
    `SELECT * FROM Collection where userId = '${user.id}'`
  );
  const collections = data?.rows as Collection[];

  if (!collections || collections.length === 0)
    return <div>No collections found for user with id {user.id}</div>;

  return (
    <>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </>
  );
}
