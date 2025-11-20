import { NextResponse } from 'next/server';
import { fetchAllEntities } from '@/lib/kibo-api';

export async function GET() {
  try {
    const result = await fetchAllEntities('faq@hoycobfl', 'FAQs');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in FAQs API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

