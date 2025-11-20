import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/kibo-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    if (!query || query.trim() === '') {
      return NextResponse.json({ data: [], totalCount: 0 });
    }

    const result = await searchProducts(query, pageSize);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in product-search API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

