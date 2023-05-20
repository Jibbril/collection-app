import CollectionGallery from './CollectionGallery';
import CreateButton from '@/components/collections/CreateButton';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

export default async function CollectionsPage() {
  const user = await currentUser();

  if (!user) return redirect('/login');

  const collections = await prisma.collection.findMany({
    where: {
      userId: user.id,
    },
    include: {
      tags: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  return (
    <div className='mt-1 flex w-full'>
      <div className='flex w-full flex-col items-center'>
        {/* <div className='mb-2 mt-4 flex items-center'>
        <h1 className='font-heading text-4xl lg:text-5xl'>Collections</h1>
        <CreateButton type='collection' />
      </div> */}

        <CollectionGallery collections={collections} />
      </div>
      <div className='mt-3'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreateButton type='collection' />
            </TooltipTrigger>
            <TooltipContent sideOffset='-0.5' side='bottom'>
              <p>Create new Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
