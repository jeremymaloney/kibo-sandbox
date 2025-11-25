// app/api/search-products/route.ts
import { NextResponse } from "next/server";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

export async function GET(request: Request) {
  try {
    // Get query parameter from URL search params
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Get access token - use absolute URL for server-side fetch
    const baseUrl =
      //   process.env.NEXT_PUBLIC_BASE_URL ||
      //   request.headers.get("origin") ||
      `http://localhost:${3000}`;

    const tokenResponse = await fetch(`${baseUrl}/api/auth/token`);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error(
        "Search Products - Get Access Token fetch failed:",
        errorData
      );
      return NextResponse.json(
        { error: "Failed to get access token", details: errorData },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken: string = tokenData.accessToken;

    const queryRes = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/productsearch/search?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
          "x-vol-site": `${SITE_ID}`,
        },
      }
    );

    if (!queryRes.ok) {
      const errorData = await queryRes.text();
      console.error("Search query failed:", errorData);
      return NextResponse.json(
        { error: "Search product query failed", details: errorData },
        { status: 401 }
      );
    }

    const data = await queryRes.json();
    // console.log('queryRes data: ', data);

    // Ensure items exists and is an array
    const items = data?.items || [];

    if (!Array.isArray(items)) {
      console.error("Expected items array but got:", typeof items, items);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error with search products:", error);
    return NextResponse.json(
      { error: "Search Products failed", details: String(error) },
      { status: 400 }
    );
  }
}
