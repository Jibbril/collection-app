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
import { type ItemWithTags } from '@/types/collections';
import { shortenIfNeeded } from '@/lib/utils';

interface Props {
  collectionSlug: string;
  item: ItemWithTags;
}

export default function ItemCard({ item, collectionSlug }: Props) {
  return (
    <Link
      prefetch={false}
      className='relative m-2 flex max-h-56 w-72'
      href={`/collections/${collectionSlug}/${item.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='py-1'>{item.name}</CardTitle>
            <CardEditButton entity={item} type='item' />
          </div>
        </CardHeader>
        <CardContent className='flex flex-grow flex-col'>
          <CardDescription>{shortenIfNeeded(item.description)}</CardDescription>
          <div className='mt-2'>
            <TagGrid tags={item.tags} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
