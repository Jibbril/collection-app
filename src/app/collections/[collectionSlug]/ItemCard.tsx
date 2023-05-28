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
import { shortenIfNeeded } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { ExternalLink } from 'lucide-react';
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
            <div className='absolute right-2 top-2 flex'>
              {item.link && (
                <a href={item.link} target='_blank'>
                  <Button
                    variant='ghost'
                    className='h-8 w-8 rounded-full p-0 '
                    onClick={(e) => {
                      e.stopPropagation();
                    }}>
                    <ExternalLink className='h-4 w-4' />
                    <span className='sr-only'>Go to item link</span>
                  </Button>
                </a>
              )}
              <CardOptionsButton
                entity={item}
                type='item'
                setLoading={setLoading}
              />
            </div>
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
