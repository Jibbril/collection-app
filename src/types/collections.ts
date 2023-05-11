export interface Collection {
  id: string;
  name: string;
  description?: string;
  slug: string;
  userId?: string;
}

export interface CollectionWithItems extends Collection {
  items: Item[];
}

export interface Item {
  id: string;
  slug: string;
  name: string;
  description?: string;
  collectionId: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  userId: string;
}
