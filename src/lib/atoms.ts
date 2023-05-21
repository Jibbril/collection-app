import { type CollectionWithTags } from '@/types/collections';
import { atom } from 'jotai';

export const collectionsAtom = atom<CollectionWithTags[]>([]);
