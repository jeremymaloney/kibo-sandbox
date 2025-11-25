// GET CATEGORY BY ID
// app/api/category/[id]

import { NextResponse } from "next/server";

const TENANT_ID = process.env.KIBO_TENANT_ID;
const SITE_ID = process.env.KIBO_SITE_ID;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category is required" },
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

    const catResponse = await fetch(
      `https://t${TENANT_ID}-s${SITE_ID}.sb.usc1.gcp.kibocommerce.com/api/commerce/catalog/admin/categories/${id}`,
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
      console.error("Get category failed:", errorData);
      return NextResponse.json(
        { error: "Get category failed", details: errorData },
        { status: 401 }
      );
    }

    const data = catResponse.json();
    console.log("get product by cat ID data: ", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error with GET cat:", error);
    return NextResponse.json(
      { error: "Get cat failed", details: String(error) },
      { status: 400 }
    );
  }
}
