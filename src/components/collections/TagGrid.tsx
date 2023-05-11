import { type Tag } from '@prisma/client';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  editable?: boolean;
  className?: string;
}

export default function TagGrid({ className, tags, setTags, editable }: Props) {
  return (
    <div className={cn(className, 'flex flex-wrap')}>
      {tags.map((tag) => (
        <span key={tag.id}>
          <Badge variant='secondary' className='mr-2'>
            {editable ? (
              <div className='ml-0.5 flex items-center'>
                {tag.name}
                <Button
                  className='m-0 ml-1 h-0 p-0'
                  variant='ghost'
                  onClick={() => {
                    setTags(tags.filter((t) => t.id !== tag.id));
                  }}>
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <span>{tag.name}</span>
            )}
          </Badge>
        </span>
      ))}
    </div>
  );
}
