'use client';

import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ItemGallery from './ItemGallery';
import CreateButton from '@/components/collections/CreateButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { type CollectionWithItemsAndTags } from '@/types/collections';
import { useSWR } from '@/lib/hooks/swr';
import Loader from '@/components/navigation/Loader';
import ErrorPage from '@/components/error-page';
import { itemsAtom } from '@/lib/atoms';
import { useSetAtom } from 'jotai';
interface Props {
  params: {
    collectionSlug: string;
  };
}

export default function ItemsPage({ params }: Props) {
  const { userId } = useAuth();
  const { data, isLoading, error } = useSWR<CollectionWithItemsAndTags>(
    `/api/items?collectionSlug=${params.collectionSlug}`
  );
  const setItems = useSetAtom(itemsAtom);

  if (!userId) return redirect('/login');

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  setItems(data?.items || []);

  if (!data) return null;

  return (
    <div className='mt-1 flex w-full'>
      <div className='flex w-full flex-col items-center'>
        <div className='mb-2 mt-4 flex items-center'>
          <h4 className='font-heading text-3xl font-bold lg:text-4xl'>
            {data?.name}
          </h4>
        </div>
        <ItemGallery collectionSlug={data.slug} />
      </div>
      <div className='mt-3'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreateButton collectionId={data.id} type='item' />
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Create new Item</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
