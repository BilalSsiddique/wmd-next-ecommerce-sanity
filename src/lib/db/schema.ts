import { InferModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const dine_market_cart = pgTable("dine_market_cart", {
  cart_id: serial("cart_id").primaryKey(),
  user_id: varchar("user_id", { length: 100 }).notNull(),
  product_name: varchar("product_name", { length: 256 }).notNull(),
  product_slug: varchar("product_slug", { length: 256 }).notNull(),
  product_type: varchar("product_type", { length: 100 }).notNull(),
  product_image_url: text("product_image_url").notNull(),
  product_size: varchar("product_size", { length: 10 }).notNull(),
  product_quantity: integer("product_quantity").notNull(),
  product_price: integer("product_price").notNull(),
  create_time: timestamp("create_time").defaultNow(),
});


export type CartItem = InferModel<typeof dine_market_cart>; // return type when queried
export type NewCartItem = InferModel<typeof dine_market_cart, 'insert'>; // insert type