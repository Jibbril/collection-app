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

export const validateURL = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)+\\.)+[a-z]{2,})' + // domain name and extension
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%_.~+]*)*' + // path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(url);
};
