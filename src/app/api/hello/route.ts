import { NextRequest, NextResponse } from "next/server";

export async function GET(NextRequest: NextRequest) {
  console.log('request')
  return NextResponse.json({ user: "hello" });
}
