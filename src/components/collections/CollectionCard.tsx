import { type Collection } from '@/types/collections';
import { MouseEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Badge } from '../shadcn-ui/badge';
import { Button } from '../shadcn-ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

interface Props {
  collection: Collection;
  editing?: boolean;
}

export default function CollectionCard({ collection, editing }: Props) {
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`delete ${collection.name}`);
  };

  return (
    <Link
      className='relative m-2 flex max-h-56'
      href={`/collections/${collection.slug}`}>
      <Card className='flex flex-grow flex-col'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='py-1'>{collection.name}</CardTitle>
            {editing && (
              <Button
                onClick={handleDelete}
                variant='outline'
                className='absolute right-2 top-2 h-6 w-6 rounded-full p-0 '>
                <X className='h-4 w-4' />
                <span className='sr-only'>
                  Delete collection {collection.name}
                </span>
              </Button>
            )}
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
