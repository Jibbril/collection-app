import { type Tag, type Prisma } from '@prisma/client';

export type CollectionWithItems = Prisma.CollectionGetPayload<{
  include: { items: true };
}>;
export type CollectionWithTags = Prisma.CollectionGetPayload<{
  include: { tags: true };
}>;
export type CollectionWithItemsAndTags = Prisma.CollectionGetPayload<{
  include: {
    tags: true;
    items: { include: { tags: true } };
  };
}>;
export type ItemWithTags = Prisma.ItemGetPayload<{ include: { tags: true } }>;

export interface FormState {
  name: string;
  description: string;
  link: string;
  linkValid: boolean;
  tags: Tag[];
}
