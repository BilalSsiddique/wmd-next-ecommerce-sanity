import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { dine_market_cart } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const key = process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY || "";
const stripe = new Stripe(key, {
  apiVersion: "2023-08-16",
});

const webhookSecret: string = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as any;
        const customerData = await stripe.customers.retrieve(session.customer);
        // @ts-ignore
        const user_id = customerData.metadata.userId;

        await db
          .delete(dine_market_cart)
          .where(eq(dine_market_cart.user_id, user_id));
        break;

      default:
        // console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
