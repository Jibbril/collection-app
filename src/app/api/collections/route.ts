import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) return new NextResponse(null, { status: 401 });

  const collections = await prisma.collection.findMany({
    orderBy: {
      name: 'asc',
    },
    where: { userId: user.id },
    include: {
      tags: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  return NextResponse.json(collections);
}
