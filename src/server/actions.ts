'use server';

import { generateSlug } from '@/lib/slug-handling';
import { prisma } from '@/lib/prisma';
import { type Tag } from '@prisma/client';

export const addCollection = async (config: {
  name: string;
  description: string;
  userId: string;
  tags: Tag[];
}) => {
  const collection = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    userId: config.userId,
  };

  const connectTags = await ensureTagExistence(config.userId, config.tags);

  await prisma.collection.create({
    data: {
      ...collection,
      tags: {
        connect: connectTags,
      },
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

export const addItem = async (config: {
  name: string;
  description: string;
  userId: string;
  collectionId: string;
  tags: Tag[];
}) => {
  const item = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    collectionId: config.collectionId,
  };

  await prisma.item.create({
    data: {
      ...item,
      tags: {
        create: config.tags.map((tag) => ({
          name: tag.name,
          userId: config.userId,
        })),
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
