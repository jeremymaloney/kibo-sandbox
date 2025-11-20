import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/kibo-api';

export async function GET() {
  try {
    const result = await fetchProducts(200, 'products');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}