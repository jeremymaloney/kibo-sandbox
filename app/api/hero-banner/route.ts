import { NextResponse } from 'next/server';
import { fetchAllEntities } from '@/lib/kibo-api';

export async function GET() {
  try {
    const result = await fetchAllEntities('hero-banner@hoycobfl', 'hero banners');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in hero-banner API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

