import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const params = new URLSearchParams({
    page: searchParams.get("page") || "1",
    ...(searchParams.get("name") && { name: searchParams.get("name")! }),
  });
  try {
    const res = await fetch(`${API_URL}/character?${params}`, {
      next: { revalidate: 3600 },
    });
    return NextResponse.json(res.ok ? await res.json() : { error: res.statusText }, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
