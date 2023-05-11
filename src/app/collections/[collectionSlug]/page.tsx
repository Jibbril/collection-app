import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ItemGallery from './ItemGallery';
import CreateButton from '@/components/collections/CreateButton';

interface Props {
  params: {
    collectionSlug: string;
  };
}

export default async function ItemsPage({ params }: Props) {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const collection = await prisma.collection.findFirst({
    where: {
      userId: user.id,
      slug: params.collectionSlug,
    },
    include: {
      items: true,
    },
  });

  if (!collection) return redirect('/collections');

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='mb-2 mt-4 flex items-center'>
        <h1 className='font-heading text-4xl lg:text-5xl'>{collection.name}</h1>
        <CreateButton collectionId={collection.id} type='item' />
      </div>
      <ItemGallery collectionSlug={collection.slug} items={collection.items} />
    </div>
  );
}
