import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { collectionsAndItems } from '@/server/queries';

interface Props {
  params: {
    collectionSlug: string;
  };
}

export default async function ItemsPage({ params }: Props) {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const res = await collectionsAndItems(
    `WHERE c.userId = '${user.id}' AND c.slug = '${params.collectionSlug}'`
  );

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='mb-2 mt-4 flex items-center'>
        <h1 className='font-heading text-4xl lg:text-5xl'>{res[0].name}</h1>
      </div>
      {res[0]?.items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
