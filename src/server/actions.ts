'use server';

import { dbQuery } from '@/lib/db';
import { generateSlug } from '@/lib/slug-handling';
import { type Collection } from '@/types/collections';

export const addCollection = async (config: Collection) => {
  if (!config.userId) throw new Error('userId is required');

  const collection = {
    id: config.id,
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    userId: config.userId,
  };

  await dbQuery('INSERT INTO Collection () ?', collection);
};

export const deleteCollection = async (id: string) => {
  await dbQuery(`DELETE FROM Collection WHERE id = '${id}'`);
};
