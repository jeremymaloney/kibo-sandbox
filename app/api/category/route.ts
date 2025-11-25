// GET ALL CATEGORIES
// app/api/category

import { NextResponse } from "next/server";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

export async function GET() {
  try {
    const baseUrl =
      //   process.env.NEXT_PUBLIC_BASE_URL ||
      //   request.headers.get("origin") ||
      `http://localhost:${3000}`;

    const tokenResponse = await fetch(`${baseUrl}/api/auth/token`);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      return NextResponse.json(
        { error: "Failed to get access token", details: errorData },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken: string = tokenData.accessToken;

    const catResponse = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/categories`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
          "x-vol-site": `${SITE_ID}`,
        },
      }
    );

    if (!catResponse.ok) {
      const errorData = await catResponse.text();
      console.error("Get categories failed:", errorData);
      return NextResponse.json(
        { error: "Get categories failed", details: errorData },
        { status: 401 }
      );
    }

    const data = catResponse.json();
    console.log("get categories data: ", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error with GET categories:", error);
    return NextResponse.json(
      { error: "Get categories failed", details: String(error) },
      { status: 400 }
    );
  }
}
