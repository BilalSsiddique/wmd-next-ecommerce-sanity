import { db } from "@/lib/db/drizzle";
import { sql, eq } from "drizzle-orm";
import { dine_market_cart } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user_id = request.headers.get("authorization");
  if (!user_id) {
    return NextResponse.json("unauthorizaed", { status: 401 });
  }
  try {
    const result = await db
      .select({
        numItems: sql<number>`sum(dine_market_cart.product_quantity)`,
      })
      .from(dine_market_cart)
      .where(eq(dine_market_cart.user_id, user_id));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json([{ numItems: 0 }], { status: 500 });
  }
}
