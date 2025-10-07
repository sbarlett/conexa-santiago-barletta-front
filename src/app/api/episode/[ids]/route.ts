import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(_: NextRequest, { params }: { params: Promise<{ ids: string }> }) {
  const { ids } = await params;
  if (!ids) return NextResponse.json({ error: "No episode IDs provided" }, { status: 400 });
  try {
    const res = await fetch(`${API_URL}/episode/${ids}`, { next: { revalidate: 86400 } });
    return NextResponse.json(res.ok ? await res.json() : { error: res.statusText }, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
