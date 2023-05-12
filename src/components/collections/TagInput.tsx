import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '../shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover';
import { Button } from '../shadcn-ui/button';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { type Tag } from '@prisma/client';
import { searchTags } from '@/server/actions';

interface Props {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  userId: string;
}

export default function TagInput({ tags, setTags, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [queryTags, setQueryTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const getQueryTags = setTimeout(() => {
      searchTags(query, userId)
        .then((res) => {
          setQueryTags(res);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, 1000);

    return () => clearTimeout(getQueryTags);
  }, [query, userId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'>
          Add Tags...
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn([`w-[${ref.current?.clientWidth || 300}px]`, 'p-0'])}>
        <Command
          filter={(value, search) => {
            if (value.includes(search)) return 1;
            return 0;
          }}>
          <CommandInput
            value={query}
            onValueChange={(val) => {
              setLoading(true);
              setQuery(val);
            }}
            placeholder='Add Tags...'
          />
          {!loading && <CommandEmpty>Add New Tag</CommandEmpty>}
          <CommandList>
            {loading && (
              <CommandLoading>
                <div className='m-1.5 flex w-full justify-center'>
                  <Loader2 className='h-6 w-6 animate-spin' />
                </div>
              </CommandLoading>
            )}
            {!loading &&
              queryTags.map((queryTag) => (
                <CommandItem
                  key={queryTag.id}
                  value={queryTag.name}
                  onSelect={(currentValue) => {
                    setTags([
                      ...tags,
                      {
                        name: currentValue,
                        id: uuidv4(),
                        userId: null,
                      },
                    ]);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      tags.find((t) => t.name === queryTag.name)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {queryTag.name}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
