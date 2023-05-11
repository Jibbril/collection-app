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
import { type CollectionWithTags } from '@/types/collections';
import { shortenIfNeeded } from '@/lib/utils';

interface Props {
  collection: CollectionWithTags;
}

export default function CollectionCard({ collection }: Props) {
  return (
    <Link
      prefetch={false}
      className='relative m-2 flex max-h-56 w-72'
      href={`/collections/${collection.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='py-1'>{collection.name}</CardTitle>
            <CardEditButton entity={collection} type='collection' />
          </div>
        </CardHeader>
        <CardContent className='flex flex-grow flex-col'>
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
