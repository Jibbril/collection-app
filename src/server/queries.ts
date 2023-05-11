import { dbQuery } from '@/lib/db';
import { type CollectionWithItems } from '@/types/collections';

const generateItem = (row: any) => ({
  id: row.item_id,
  name: row.item_name,
  description: row.item_description,
  slug: row.item_slug,
  collectionId: row.item_collectionId,
  tags: [],
});

const generateCollection = (row: any) => ({
  id: row.collection_id,
  name: row.collection_name,
  description: row.collection_description,
  slug: row.collection_slug,
  userId: row.collection_userId,
});

export const collectionsAndItems = async (where: string) => {
  const query =
    `
     SELECT 
      i.id as item_id,
      i.name as item_name,
      i.description as item_description, 
      i.slug as item_slug,
      i.collectionId as item_collectionId,
      c.id as collection_id,
      c.name as collection_name,
      c.description as collection_description,
      c.slug as collection_slug,
      c.userId as collection_userId
     FROM Collection c
     LEFT JOIN Item i
     ON i.collectionId = c.id 
    ` +
    where +
    'GROUP BY c.id, i.id';

  const { rows } = await dbQuery(query);

  const collections = rows.reduce((acc: CollectionWithItems[], row: any) => {
    const lastCollection = acc.at(-1);
    if (!lastCollection) {
      // first iteration
      acc.push({ ...generateCollection(row), items: [generateItem(row)] });
    } else if (lastCollection.id === row.collection_id) {
      // same collection
      lastCollection.items.push(generateItem(row));
    } else {
      // new collection
      acc.push({
        ...generateCollection(row),
        items: [generateItem(row)],
      });
    }

    return acc;
  }, []);

  return collections;
};
