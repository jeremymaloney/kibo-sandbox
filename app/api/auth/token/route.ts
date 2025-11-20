// app/api/auth/token/route.ts
import { NextResponse } from "next/server";

const APP_KEY = process.env.KIBO_APP_KEY; // Full application key like hoycobfl.APIConnect.1.0.0.Release
const SHARED_SECRET = process.env.KIBO_SHARED_SECRET;

export async function GET() {
  try {
    const authResponse = await fetch(
      `https://home.usc1.gcp.kibocommerce.com/api/platform/applications/authtickets/oauth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: APP_KEY,
          client_secret: SHARED_SECRET,
          grant_type: "client_credentials",
        }),
      }
    );

    if (!authResponse.ok) {
      const errorData = await authResponse.text();
      console.error("Access Token Auth failed:", errorData);
      return NextResponse.json(
        { error: "Authentication failed", details: errorData },
        { status: 400 }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;
    // console.log("accessToken:", accessToken);

    return NextResponse.json({ accessToken: accessToken }, { status: 200 });
  } catch (error) {
    console.error("Error getting access token:", error);
    return NextResponse.json(
      { error: "Get Access Token failed", details: String(error) },
      { status: 400 }
    );
  }
}
