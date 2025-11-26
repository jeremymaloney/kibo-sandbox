// GET PRODUCTS BY CATEGORY ID
// app/api/category/products/[id]

import { NextResponse } from "next/server";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

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

    const catProdsResponse = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/admin/products?filter=categoryId+eq+${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
          "x-vol-site": `${SITE_ID}`,
        },
      }
    );

    if (!catProdsResponse.ok) {
      const errorData = await catProdsResponse.text();
      console.error("Get Product by category failed:", errorData);
      return NextResponse.json(
        { error: "Get Product by category failed", details: errorData },
        { status: 401 }
      );
    }

    const data = await catProdsResponse.json();
    console.log("get product by cat ID data: ", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error with GET product by cat ID:", error);
    return NextResponse.json(
      { error: "Get Product by cat ID failed", details: String(error) },
      { status: 400 }
    );
  }
}
