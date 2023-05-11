import CollectionGallery from './CollectionGallery';
import CreateButton from '@/components/collections/CreateButton';
import { type Collection } from '@/types/collections';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { dbQuery } from '@/lib/db';

export default async function CollectionsPage() {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const { rows } = await dbQuery(
    `SELECT * FROM Collection where userId = '${user.id}'`
  );

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='mb-2 mt-4 flex items-center'>
        <h1 className='font-heading text-4xl lg:text-5xl'>Collections</h1>
        <CreateButton type='collection' />
      </div>

      <CollectionGallery collections={rows as Collection[]} />
    </div>
  );
}
