'use server';

import { v4 as uuidv4 } from 'uuid';
import { dbQuery } from '@/lib/db';
import { generateSlug } from '@/lib/slug-handling';

export const addCollection = async (config: {
  name: string;
  description: string;
  userId: string;
}) => {
  const collection = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    name: config.name,
    description: config.description || '',
    slug: await generateSlug(config.name, config.userId),
    userId: config.userId,
  };

  await dbQuery(
    `
    INSERT INTO Collection (id,name,description,slug,userId) 
    VALUES (:id,:name,:description,:slug,:userId)`,
    collection
  );
};

export const deleteCollection = async (id: string) => {
  await dbQuery(`DELETE FROM Collection WHERE id = '${id}'`);
};
