import { type Collection } from '@/types/collections';
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

interface Props {
  collection: Collection;
}

export default function CollectionCard({ collection }: Props) {
  return (
    <Link
      className='relative m-2 flex max-h-56 w-72'
      href={`/collections/${collection.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='py-1'>{collection.name}</CardTitle>
            <CardEditButton collection={collection} type='collection' />
          </div>
        </CardHeader>
        <CardContent className='flex flex-grow'>
          <CardDescription>{collection.description}</CardDescription>
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
