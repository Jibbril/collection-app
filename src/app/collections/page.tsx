'use client';

import CollectionGallery from './CollectionGallery';
import CreateButton from '@/components/collections/CreateButton';
import Loader from '@/components/navigation/Loader';
import ErrorPage from '@/components/error-page';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useSWR } from '@/lib/hooks/swr';
import { type CollectionWithTags } from '@/types/collections';

export default function CollectionsPage() {
  const { userId } = useAuth();
  const { data, isLoading, error } =
    useSWR<CollectionWithTags[]>('/api/collections');

  if (!userId) return redirect('/login');

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className='mt-1 flex w-full'>
      <div className='flex w-full flex-col items-center'>
        <CollectionGallery collections={data} />
      </div>
      <div className='mt-3'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreateButton type='collection' />
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Create new Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
