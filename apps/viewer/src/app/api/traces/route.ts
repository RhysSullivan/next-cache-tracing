import { NextRequest, NextResponse } from "next/server";
import { ingestor } from "./types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  ingestor.ingest(body);
  return NextResponse.json({ message: "Traces received" });
}
