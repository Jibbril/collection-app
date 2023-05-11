import { type Tag } from '@prisma/client';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { X } from 'lucide-react';

interface Props {
  tags: Tag[];
  editable?: boolean;
}

export default function TagGrid({ tags, editable }: Props) {
  return (
    <div className='flex flex-wrap'>
      {tags.map((tag) => (
        <span key={tag.id}>
          <Badge variant='secondary' className='mr-2'>
            {tag.name}
          </Badge>
          {editable && (
            <Button variant='ghost'>
              <X size={3} />
            </Button>
          )}
        </span>
      ))}
    </div>
  );
}
