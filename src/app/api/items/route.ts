import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await currentUser();

  const { searchParams } = new URL(req.url);
  const collectionSlug = searchParams.get('collectionSlug');

  if (!collectionSlug) return new NextResponse(null, { status: 400 });
  if (!user) return new NextResponse(null, { status: 401 });

  const collections = await prisma.collection.findFirst({
    where: { userId: user.id, slug: collectionSlug },
    include: {
      tags: {
        orderBy: {
          name: 'asc',
        },
      },
      items: {
        orderBy: {
          name: 'asc',
        },
        include: {
          tags: {
            orderBy: {
              name: 'asc',
            },
          },
        },
      },
    },
  });

  return NextResponse.json(collections);
}
