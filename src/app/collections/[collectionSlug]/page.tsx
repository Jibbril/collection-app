import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ItemGallery from './ItemGallery';
import CreateButton from '@/components/collections/CreateButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

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
      items: {
        include: {
          tags: {
            orderBy: {
              name: 'asc',
            },
          },
        },
      },
    },
  });

  if (!collection) return redirect('/collections');

  return (
    <div className='mt-1 flex w-full'>
      <div className='flex w-full flex-col items-center'>
        <div className='mb-2 mt-4 flex items-center'>
          <h4 className='font-heading text-3xl font-bold lg:text-4xl'>
            {collection.name}
          </h4>
        </div>
        <ItemGallery
          collectionSlug={collection.slug}
          items={collection.items}
        />
      </div>
      <div className='mt-3'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreateButton collectionId={collection.id} type='item' />
            </TooltipTrigger>
            <TooltipContent sideOffset='-0.5' side='bottom'>
              <p>Create new Item</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
