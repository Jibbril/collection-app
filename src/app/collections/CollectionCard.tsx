import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import Link from 'next/link';
import CardOptionsButton from '@/components/collections/CardOptionsButton';
import TagGrid from '@/components/collections/TagGrid';
import { type CollectionWithTags } from '@/types/collections';
import { shortenIfNeeded } from '@/lib/utils';
import { useState } from 'react';
import Loader from '@/components/navigation/Loader';

interface Props {
  collection: CollectionWithTags;
}

export default function CollectionCard({ collection }: Props) {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Card className='relative m-2 flex h-52 w-72'>
        <CardContent className='flex flex-grow flex-col'>
          <Loader center={true} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      prefetch={false}
      className='relative m-2 flex h-52 w-72'
      href={`/collections/${collection.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='py-1'>{collection.name}</CardTitle>
            <CardOptionsButton
              entity={collection}
              type='collection'
              setLoading={setLoading}
            />
          </div>
        </CardHeader>
        <CardContent className='flex h-full flex-grow flex-col justify-between'>
          <CardDescription>
            {shortenIfNeeded(collection.description)}
          </CardDescription>
          <div className='mt-2'>
            <TagGrid tags={collection.tags} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
