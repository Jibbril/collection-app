'use server';

import { generateSlug } from '@/lib/slug-handling';
import { prisma } from '@/lib/prisma';

export const addCollection = async (config: {
  name: string;
  description: string;
  userId: string;
}) => {
  const collection = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    userId: config.userId,
  };

  await prisma.collection.create({
    data: collection,
  });
};

export const addItem = async (config: {
  name: string;
  description: string;
  userId: string;
  collectionId: string;
}) => {
  const item = {
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    collectionId: config.collectionId,
  };

  await prisma.item.create({
    data: item,
  });
};

export const deleteCollection = async (id: string) => {
  await prisma.collection.delete({ where: { id } });
};

export const deleteItem = async (id: string) => {
  await prisma.item.delete({ where: { id } });
};
