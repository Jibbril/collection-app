import { type Collection } from '@/types/collections';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Badge } from '../shadcn-ui/badge';
import Link from 'next/link';

interface Props {
  collection: Collection;
}

export default function CollectionCard({ collection }: Props) {
  return (
    <Link
      className='m-2 flex max-h-56'
      href={`/collections/${collection.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <CardTitle>{collection.name}</CardTitle>
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
