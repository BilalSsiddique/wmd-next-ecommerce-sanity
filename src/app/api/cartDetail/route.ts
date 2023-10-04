import { db } from "@/lib/db/drizzle";
import { dine_market_cart } from "@/lib/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const user_id = request.headers.get("authorization");
  if (user_id) {
    try {
      const result = await db
        .select()
        .from(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id))
        .orderBy(
          asc(dine_market_cart.product_name),
          asc(dine_market_cart.product_size)
        );
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json([], { status: 500 });
    }
  } else {
    return NextResponse.json([], { status: 400 });
  }
}


export async function PATCH(request: NextRequest) {
  let body = await request.json();
  console.log('body',body)
  try {
    const updatedQuantity: { updatedQuantity: number }[] = await db
      .update(dine_market_cart)
      .set({ product_quantity: body.productQuantity })
      .where(
        sql`${dine_market_cart.cart_id} = ${body.cartId} AND ${dine_market_cart.user_id} = ${body.userId}`
      )
      .returning({ updatedQuantity: dine_market_cart.product_quantity });
    return NextResponse.json(updatedQuantity, { status: 200 });
  } catch (error) {
    return NextResponse.json({ response: "failed" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const userId = request.headers.get("authorization");
  const cartId = request.headers.get("cartId");

  if (userId && cartId) {
    try {
      await db
        .delete(dine_market_cart)
        .where(
          sql`${dine_market_cart.cart_id} = ${cartId} AND ${dine_market_cart.user_id} = ${userId}`
        );
      return NextResponse.json({ response: "success" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ response: "failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ response: "failed" }, { status: 500 });
  }
}
