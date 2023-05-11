'use server';

import { type Collection } from '@prisma/client';
import { prisma } from './prisma';

export const generateSlug = async (name: string, userId: string) => {
  let slug = slugify(name);

  const sameSlugCollections = await prisma.collection.findMany({
    where: {
      slug: { startsWith: slug },
      userId,
    },
  });

  if (sameSlugCollections.length > 0) {
    slug = addSlugSuffix(sameSlugCollections, slug);
  }

  return slug;
};

const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const addSlugSuffix = (
  sameSlugElements: Collection[], // | Item[],
  slug: string
) => {
  let i = 1;

  for (const item of sameSlugElements) {
    const suffix = item.slug.split('-').pop();
    if (!suffix) continue;

    const suffixNumber = parseInt(suffix);
    if (suffixNumber && suffixNumber > i) i = suffixNumber;
  }

  return `${slug}-${i + 1}`;
};
