import { NextResponse } from 'next/server';
import { fetchEntityById } from '@/lib/kibo-api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;
    const result = await fetchEntityById('cms-pages@hoycobfl', pageId, `CMS page: ${pageId}`);
    return NextResponse.json(result);
  } catch (error) {
    const { pageId } = await params;
    console.error(`Error fetching CMS page ${pageId}:`, error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

