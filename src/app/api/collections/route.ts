import { dbQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get('userId');
  if (userId) {
    const { rows } = await dbQuery(
      `SELECT * FROM Collection where userId = '${userId}'`
    );
    return NextResponse.json(rows);
  }
  return NextResponse.json({});
}
