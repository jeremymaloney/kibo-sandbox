// app/api/faqs/route.ts
import { NextResponse } from 'next/server';

// Load credentials from environment variables
const APP_KEY = process.env.KIBO_APP_KEY;
const SHARED_SECRET = process.env.KIBO_SHARED_SECRET;
const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

export async function GET() {
  try {
    // Step 1: Authenticate with Kibo to get access token
    const authResponse = await fetch(
      `https://home.usc1.gcp.kibocommerce.com/api/platform/applications/authtickets/oauth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: APP_KEY,
          client_secret: SHARED_SECRET,
          grant_type: 'client_credentials',
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.text();
      console.error('Auth failed:', errorData);
      return NextResponse.json(
        { error: 'Authentication failed', details: errorData },
        { status: 401 }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Step 2: Fetch FAQ entities from Kibo
    const entityListFullName = 'faq@hoycobfl';
    const faqResponse = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/platform/entitylists/${entityListFullName}/entities`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!faqResponse.ok) {
      const errorData = await faqResponse.text();
      console.error('FAQ fetch failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch FAQs', details: errorData },
        { status: faqResponse.status }
      );
    }

    const faqData = await faqResponse.json();

    // Return the entities
    return NextResponse.json({
      data: faqData.items || [],
      totalCount: faqData.totalCount || 0,
    });

  } catch (error) {
    console.error('Error in FAQs API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

