import {
  type ItemWithTags,
  type CollectionWithTags,
} from '@/types/collections';
import { atom } from 'jotai';

export const collectionsAtom = atom<CollectionWithTags[]>([]);
export const itemsAtom = atom<ItemWithTags[]>([]);
