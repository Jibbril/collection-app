'use server';

import { generateSlug } from '@/lib/slug-handling';
import { prisma } from '@/lib/prisma';
import { type Tag } from '@prisma/client';
import {
  type CollectionWithTags,
  type ItemWithTags,
} from '@/types/collections';

export const addCollection = async (config: {
  name: string;
  description: string;
  userId: string;
  tags: Tag[];
}): Promise<CollectionWithTags> => {
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

export const addItem = async (config: {
  name: string;
  description: string;
  userId: string;
  collectionId: string;
  link: string;
  tags: Tag[];
}): Promise<ItemWithTags> => {
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