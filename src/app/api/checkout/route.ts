import { db } from "@/lib/db/drizzle";
import { dine_market_cart } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import Stripe from "stripe";


const key = process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY || "";
const stripe = new Stripe(key, {
  apiVersion: "2023-08-16",
});

export async function POST(request: NextRequest) {

  const user_id = request.headers.get("authorization");
  
  try {
    if (user_id) {
      const customer = await stripe.customers.create({
        metadata: {
          userId: user_id,
        },
      });
      try {
        const result = await db
          .select()
          .from(dine_market_cart)
          .where(eq(dine_market_cart.user_id, user_id))
          .orderBy(
            asc(dine_market_cart.product_name),
            asc(dine_market_cart.product_size)
          );
        if (result.length != 0) {
          const params: Stripe.Checkout.SessionCreateParams = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
              { shipping_rate: "shr_1NxDY5DHpAUbckCI3kMzEo48" },
              { shipping_rate: "shr_1NxDZ7DHpAUbckCIpjKxo3jh" },
            ],
            line_items: result.map((item) => {
              return {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: item.product_name,
                    images: [item.product_image_url],
                  },
                  unit_amount: item.product_price * 100,
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
                },
                quantity: item.product_quantity,
              };
            }),
            customer: customer.id,
            phone_number_collection: {
              enabled: true,
            },
            shipping_address_collection: {
              allowed_countries: ["US", "CA", "GB", "PK"],
            },
            invoice_creation: {
              enabled: true,
            },
            allow_promotion_codes: true,

            success_url: `${request.headers.get(
              "origin"
            )}/successPayment`,

            cancel_url: `${request.headers.get("origin")}/cart`,
          };

          const session = await stripe.checkout.sessions.create(params);
          return NextResponse.json(session, { status: 200 });
        } else {
          return NextResponse.json({ success: false }, { status: 500 });
        }
      } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
      }
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
