import { dbQuery } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { type ExecutedQuery } from '@planetscale/database';
import { redirect } from 'next/navigation';

interface Collection {
  id: string;
  name: string;
  description?: string;
  slug: string;
  userId?: string;
}

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
        <div key={collection.id}>
          <h2>{collection.name}</h2>
          <p>{collection.description}</p>
        </div>
      ))}
    </>
  );
}
