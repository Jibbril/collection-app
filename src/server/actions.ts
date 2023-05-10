'use server';

import { dbQuery } from '@/lib/db';

export const deleteCollection = async (id: string) => {
  await dbQuery(`DELETE FROM Collection WHERE id = '${id}'`);
};
