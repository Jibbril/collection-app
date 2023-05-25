import {
  type CollectionWithTags,
  type ItemWithTags,
} from '@/types/collections';

export const filterEntities = <T extends (CollectionWithTags | ItemWithTags)[]>(
  query: string,
  entities: T
): T => {
  if (!query || query === '') {
    return entities;
  } else {
    return entities?.filter((entity) => {
      return (
        entity.name.toLowerCase().includes(query) ||
        entity.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }) as T;
  }
};
