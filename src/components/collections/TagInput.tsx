import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover';
import { Button } from '../shadcn-ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../shadcn-ui/command';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import { type Tag } from '@prisma/client';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

interface Props {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export default function TagInput({ tags, setTags }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

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
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setTags([
                    ...tags,
                    {
                      name: currentValue,
                      id: uuidv4() ,
                      userId: null,
                    },
                  ]);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    tags.find(t => t.name === framework.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
