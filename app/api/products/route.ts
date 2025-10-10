// app/api/products/route.ts
import { NextResponse } from 'next/server';

// Load credentials from environment variables
const APP_KEY = process.env.KIBO_APP_KEY; // Full application key like hoycobfl.APIConnect.1.0.0.Release
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

    // Step 2: Fetch products from Kibo
    const productsResponse = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/products?pageSize=200`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!productsResponse.ok) {
      const errorData = await productsResponse.text();
      console.error('Products fetch failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch products', details: errorData },
        { status: productsResponse.status }
      );
    }

    const productsData = await productsResponse.json();

    // Return in the format your page.tsx expects
    return NextResponse.json({
      data: productsData.items || [],
      totalCount: productsData.totalCount || 0,
    });

  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}