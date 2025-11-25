// app/api/product/[id]

import { NextResponse } from "next/server";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID/Product Code is required" },
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

    const prodResponse = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/storefront/products/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
          "x-vol-site": `${SITE_ID}`,
        },
      }
    );

    if (!prodResponse.ok) {
      const errorData = await prodResponse.text();
      console.error("Get Product search failed:", errorData);
      return NextResponse.json(
        { error: "Get Product search failed", details: errorData },
        { status: 401 }
      );
    }

    const data = prodResponse.json();
    console.log("get product data: ", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error with GET product:", error);
    return NextResponse.json(
      { error: "Get Product failed", details: String(error) },
      { status: 400 }
    );
  }
}
