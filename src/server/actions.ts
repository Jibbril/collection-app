'use server';

import { generateSlug } from '@/lib/slug-handling';
import { prisma } from '@/lib/prisma';
import { type Tag } from '@prisma/client';
import {
  type CollectionWithTags,
  type ItemWithTags,
} from '@/types/collections';

interface CollectionPayload {
  userId: string;
  name: string;
  description: string;
  tags: Tag[];
}

export const addCollection = async (
  config: CollectionPayload
): Promise<CollectionWithTags> => {
  const collection = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    userId: config.userId,
  };

  const connectTags = await ensureTagExistence(config.userId, config.tags);

  return await prisma.collection.create({
    include: {
      tags: true,
    },
    data: {
      ...collection,
      tags: {
        connect: connectTags,
      },
    },
  });
};

interface CollectionUpdatePayload extends CollectionPayload {
  id: string;
}

export const updateCollection = async (
  config: CollectionUpdatePayload
): Promise<CollectionWithTags> => {
  const collection = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
  };

  const connectTags = await ensureTagExistence(config.userId, config.tags);

  return await prisma.$transaction(async (tx) => {
    // Disconnect all tags from existing collection in case they were removed
    const existingCollection = await tx.collection.findFirst({
      where: {
        id: config.id,
      },
      include: {
        tags: true,
      },
    });

    if (existingCollection) {
      await tx.collection.update({
        where: {
          id: config.id,
        },
        data: {
          tags: {
            disconnect: [
              ...existingCollection.tags.map((tag) => ({
                id: tag.id,
              })),
            ],
          },
        },
      });
    }

    return await tx.collection.update({
      where: {
        id: config.id,
      },
      include: {
        tags: true,
      },
      data: {
        ...collection,
        tags: {
          connect: connectTags,
        },
      },
    });
  });
};

interface ItemPayload extends CollectionPayload {
  collectionId: string;
  link: string;
}

export const addItem = async (config: ItemPayload): Promise<ItemWithTags> => {
  const item = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    collectionId: config.collectionId,
    link: config.link,
  };

  const connectTags = await ensureTagExistence(config.userId, config.tags);

  return await prisma.item.create({
    include: {
      tags: true,
    },
    data: {
      ...item,
      tags: {
        connect: connectTags,
      },
    },
  });
};

interface ItemUpdatePayload extends ItemPayload {
  id: string;
}

export const updateItem = async (
  config: ItemUpdatePayload
): Promise<ItemWithTags> => {
  const item = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    collectionId: config.collectionId,
    link: config.link,
  };

  const connectTags = await ensureTagExistence(config.userId, config.tags);

  return await prisma.$transaction(
    async (tx) => {
      // Disconnect all tags from existing item in case they were remove
      const existingItem = await tx.item.findFirst({
        where: {
          id: config.id,
        },
        include: {
          tags: true,
        },
      });

      if (existingItem) {
        await tx.item.update({
          where: {
            id: config.id,
          },
          data: {
            tags: {
              disconnect: [
                ...existingItem.tags.map((tag) => ({
                  id: tag.id,
                })),
              ],
            },
          },
        });
      }

      return await tx.item.update({
        where: {
          id: config.id,
        },
        include: {
          tags: true,
        },
        data: {
          ...item,
          tags: {
            connect: connectTags,
          },
        },
      });
    },
    { maxWait: 10000 }
  );
};

export const deleteCollection = async (id: string) => {
  await prisma.collection.delete({ where: { id } });
};

export const deleteItem = async (id: string) => {
  await prisma.item.delete({ where: { id } });
};

export const searchTags = async (query: string, userId: string) => {
  return await prisma.tag.findMany({
    where: {
      userId,
      name: {
        contains: query,
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};

const ensureTagExistence = async (userId: string, tags: Tag[]) => {
  // Get all tags that already exist
  const existingTags = await prisma.tag.findMany({
    where: {
      userId,
      name: {
        in: tags.map((tag) => tag.name),
      },
    },
  });

  // Convert to map for speed in case many existing tags
  const existingTagNames = existingTags.reduce((acc, tag) => {
    acc.set(tag.name, true);
    return acc;
  }, new Map());

  // Filter out tags that already exist
  const newTags = tags.reduce((acc, tag) => {
    if (!existingTagNames.has(tag.name)) acc.push(tag);
    return acc;
  }, [] as Tag[]);

  if (newTags.length > 0) {
    // Create new Tags
    await prisma.tag.createMany({
      data: newTags,
    });

    // Add newly created Tags
    const createdTags = await prisma.tag.findMany({
      where: {
        userId,
        name: {
          in: newTags.map((tag) => tag.name),
        },
      },
    });
    existingTags.push(...createdTags);
  }

  // Return all tags
  return existingTags.map((tag) => ({ id: tag.id }));
};
