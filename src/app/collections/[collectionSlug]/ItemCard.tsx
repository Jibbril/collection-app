import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import Link from 'next/link';
import CardEditButton from '@/components/collections/EditButton';
import { type Item } from '@prisma/client';

interface Props {
  collectionSlug: string;
  item: Item;
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
            {/* <CardEditButton item={item} type='item' /> */}
          </div>
        </CardHeader>
        <CardContent className='flex flex-grow'>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Badge variant='secondary' className='mr-2'>
            Tag 1
          </Badge>
          <Badge variant='secondary' className='mr-2'>
            Tag 2
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
