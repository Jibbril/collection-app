import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import Link from 'next/link';
import CardEditButton from '@/components/collections/EditButton';
import TagGrid from '@/components/collections/TagGrid';
import { shortenIfNeeded } from '@/lib/utils';
import { useState } from 'react';
import { type ItemWithTags } from '@/types/collections';
import Loader from '@/components/navigation/Loader';

interface Props {
  collectionSlug: string;
  item: ItemWithTags;
}

export default function ItemCard({ item, collectionSlug }: Props) {
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
      href={`/collections/${collectionSlug}/${item.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='py-1'>{item.name}</CardTitle>
            <CardEditButton entity={item} type='item' setLoading={setLoading} />
          </div>
        </CardHeader>
        <CardContent className='flex h-full flex-grow flex-col justify-between'>
          <CardDescription>{shortenIfNeeded(item.description)}</CardDescription>
          <div className='mt-2'>
            <TagGrid tags={item.tags} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
