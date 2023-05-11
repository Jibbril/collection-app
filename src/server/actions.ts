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

  await prisma.collection.create({
    data: {
      ...collection,
      tags: {
        create: config.tags.map((tag) => ({
          name: tag.name,
          userId: config.userId,
        })),
      },
    },
  });
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
