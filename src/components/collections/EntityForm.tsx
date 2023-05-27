import {
  type CollectionWithTags,
  type ItemWithTags,
  type FormState,
  type Entity,
} from '@/types/collections';
import { type Tag } from '@prisma/client';
import { Label } from '@/components/shadcn-ui/label';
import { Input } from '@/components/shadcn-ui/input';
import { produce } from 'immer';
import { Textarea } from '../shadcn-ui/textarea';
import { validateURL } from '@/lib/formatters';
import { DialogFooter } from '../shadcn-ui/dialog';
import { Button } from '../shadcn-ui/button';
import { useState, type MouseEvent } from 'react';
import { addCollection, addItem } from '@/server/actions';
import { useSetAtom } from 'jotai';
import { collectionsAtom, itemsAtom } from '@/lib/atoms';
import { Loader2 } from 'lucide-react';
import TagInput from './TagInput';
import TagGrid from './TagGrid';

interface Props {
  type: Entity;
  formDefaults: FormState;
  userId: string;
  collectionId?: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
}

export default function EntityForm({
  type,
  formDefaults,
  userId,
  collectionId,
  loading,
  setLoading,
  setOpen,
}: Props) {
  const setCollections = useSetAtom(collectionsAtom);
  const setItems = useSetAtom(itemsAtom);
  const [formState, setFormState] = useState<FormState>(formDefaults);

  const { name, description, link, linkValid, tags } = formState;
  const isCollection = type === 'collection';
  const entity = isCollection ? 'Collection' : 'Item';

  const placeHolder = `Enter ${
    type === 'collection' ? 'Collection' : 'Item'
  } name...`;

  const setTags = (tags: Tag[]) => {
    setFormState(
      produce(formState, (draft) => {
        draft.tags = tags;
      })
    );
  };

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    new Promise<CollectionWithTags | ItemWithTags>((resolve) => {
      if (isCollection) {
        resolve(addCollection({ name, description, userId, tags }));
      } else {
        if (!collectionId) throw new Error('No collection ID provided');
        resolve(
          addItem({ name, description, link, collectionId, userId, tags })
        );
      }
    })
      .then((newEntity) => {
        if (newEntity && isCollection) {
          setCollections((collections) => [
            ...collections,
            newEntity as CollectionWithTags,
          ]);
        } else {
          setItems((items) => [...items, newEntity as ItemWithTags]);
        }

        setOpen(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <form>
      <div>
        <Label htmlFor='name'>{entity} Name</Label>
        <Input
          type='text'
          id='name'
          value={name}
          onChange={(e) => {
            setFormState(
              produce(formState, (draft) => {
                draft.name = e.target.value;
              })
            );
          }}
          placeholder={placeHolder}
        />
      </div>
      <div className='mt-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => {
            setFormState(
              produce(formState, (draft) => {
                draft.description = e.target.value;
              })
            );
          }}
          placeholder='Enter description...'
        />
      </div>
      {!isCollection && (
        <div className='mt-2'>
          <Label htmlFor='link'>Link</Label>
          <Input
            type='url'
            id='link'
            className={linkValid ? '' : 'border-red-600'}
            value={link}
            onChange={(e) => {
              setFormState(
                produce(formState, (draft) => {
                  draft.link = e.target.value;
                })
              );
            }}
            onBlur={() => {
              setFormState(
                produce(formState, (draft) => {
                  draft.linkValid = link === '' || validateURL(link);
                })
              );
            }}
            placeholder='Enter link...'
          />
          {!linkValid && <p className='text-sm text-red-600'>Invalid URL</p>}
        </div>
      )}
      <div className='mt-2'>
        <Label htmlFor='tags'>Tags</Label>
        <TagInput userId={userId} tags={tags} setTags={setTags} />
        <TagGrid
          editable={true}
          className='mt-4'
          tags={tags}
          setTags={setTags}
        />
      </div>
      <DialogFooter>
        <Button
          disabled={Boolean(!name || name === '' || loading)}
          onClick={handleAdd}
          className='mr-1 mt-4'
          type='submit'>
          {loading ? (
            <div className='flex items-center justify-center'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Loading...
            </div>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
