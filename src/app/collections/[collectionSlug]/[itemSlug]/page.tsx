import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface Props {
  params: {
    collectionSlug: string;
    itemSlug: string;
  };
}

export default async function ItemsPage({ params }: Props) {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const item = await prisma.item.findFirst({
    where: {
      collection: {
        userId: user.id,
        slug: params.collectionSlug,
      },
      slug: params.itemSlug,
    },
    include: {
      tags: true,
    },
  });

  if (!item) return redirect(`/collections/${params.collectionSlug}`);

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='mb-2 mt-4 flex items-center'>
        <h1 className='font-heading text-4xl lg:text-5xl'>{item.name}</h1>
      </div>
      <h4 className='font-heading ml-2 text-2xl lg:text-3xl'>
        {item.description}
      </h4>
    </div>
  );
}
