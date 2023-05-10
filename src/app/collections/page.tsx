import CollectionGallery from '@/components/collections/CollectionGallery';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { dbQuery } from '@/lib/db';
import { type Collection } from '@/types/collections';

export default async function CollectionsPage() {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const { rows } = await dbQuery(
    `SELECT * FROM Collection where userId = '${user?.id}'`
  );

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='flex items-center'>
        <h1 className='font-heading mb-2 mt-4 text-4xl lg:text-5xl'>
          Collections
        </h1>
      </div>

      <CollectionGallery collections={rows as Collection[]} />
    </div>
  );
}
