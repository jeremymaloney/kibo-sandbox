import { NextResponse } from 'next/server';
import { fetchProductByCode } from '@/lib/kibo-api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productCode: string }> }
) {
  try {
    const { productCode } = await params;

    if (!productCode) {
      return NextResponse.json(
        { error: 'Product code is required' },
        { status: 400 }
      );
    }

    const result = await fetchProductByCode(productCode);
    return NextResponse.json(result);
  } catch (error) {
    const { productCode } = await params;
    console.error(`Error fetching product ${productCode}:`, error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

