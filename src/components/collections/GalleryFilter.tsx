import { Input } from '@/components/shadcn-ui/input';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  entity: string;
}

export default function GalleryFilter({ entity, query, setQuery }: Props) {
  const placeholder = `Filter ${entity}...`;
  return (
    <Input
      className='border-bottom text-md my-2 border-none text-center text-gray-400 focus:placeholder-transparent focus-visible:ring-0'
      value={query}
      placeholder={placeholder}
      onChange={(e) => setQuery(e.target.value.toLowerCase())}
    />
  );
}
