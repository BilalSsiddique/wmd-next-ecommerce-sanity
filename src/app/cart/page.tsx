"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "@/lib/cookie";
import { CartItem } from "@/lib/db/schema";
import { useDineMarketContext } from "../context/DineContext";
import Image from "next/image";
import cart from "@/assets/cart.svg";
import CartProduct from "@/components/Cart/CartProduct";
import CartTotal from "@/components/Cart/CartTotal";
import { CartEmpty } from "@/components/Cart/CartEmpty";

const Cart = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { cartItems } = useDineMarketContext();
  const userId = getUser();

  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [cart_Items, setCart_Items] = useState<CartItem[]>([]);
  const [isButtonDisabled, setIsButtonBDisabled] = useState(false);

  async function getCartDetail(userId: string) {
    fetch(`${baseUrl}/api/cartDetail`, {
      method: "GET",
      headers: {
        "context-Type": "application/json",
        Authorization: `${userId}`,
      },
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length) {
          setCart_Items(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getCartDetail(userId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  if (cartItems === 0) {
    return <CartEmpty />;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // const cart_Items = [
  //   {
  //     cart_id: 20,
  //     user_id: "8cadb109-fba9-4fbc-960e-d237a8cd19fc",
  //     product_name: "Cameryn Sash Tie Dress",
  //     product_slug: "cameryn-sash-tie-dress",
  //     product_type: "jeans",
  //     product_image_url:
  //       "https://cdn.sanity.io/images/2uuczd4l/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png?w=700&fit=max&auto=format",
  //     product_size: "S",
  //     product_quantity: 3,
  //     product_price: 545,
  //     create_time: "2023-10-02T14:04:22.000Z",
  //   },
  //   {
  //     cart_id: 18,
  //     user_id: "8cadb109-fba9-4fbc-960e-d237a8cd19fc",
  //     product_name: "Cameryn Sash Tie Dress",
  //     product_slug: "cameryn-sash-tie-dress",
  //     product_type: "jeans",
  //     product_image_url:
  //       "https://cdn.sanity.io/images/2uuczd4l/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png?w=700&fit=max&auto=format",
  //     product_size: "XS",
  //     product_quantity: 6,
  //     product_price: 545,
  //     create_time: "2023-10-02T14:01:32.000Z",
  //   },
  //   {
  //     cart_id: 18,
  //     user_id: "8cadb109-fba9-4fbc-960e-d237a8cd19fc",
  //     product_name: "Cameryn Sash Tie Dress",
  //     product_slug: "cameryn-sash-tie-dress",
  //     product_type: "jeans",
  //     product_image_url:
  //       "https://cdn.sanity.io/images/2uuczd4l/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png?w=700&fit=max&auto=format",
  //     product_size: "XS",
  //     product_quantity: 6,
  //     product_price: 545,
  //     create_time: "2023-10-02T14:01:32.000Z",
  //   },
  // ];

  return (
    <div className="mb-20 w-full flex flex-col lg:flex-row  mx-5 lg:justify-between sm:mx-auto sm:w-5/6  lg:space-x-10  xl:space-x-12">
      <div className="lg:h-[90vh]  lg:overflow-y-auto flex flex-col basis-full lg:basis-4/5 xl:basis-2/3 gap-y-5  my-[20px]">
        {Array.isArray(cart_Items) &&
          cart_Items.length &&
          cart_Items.map((item, index) => (
            // { CART PRODUCT }
            <CartProduct
              key={item.cart_id}
              name={item.product_name}
              imageUrl={item.product_image_url}
              type={item.product_type}
              size={item.product_size}
              quantity={item.product_quantity}
              price={item.product_price}
              cartId={item.cart_id}
              setRefetch={setRefetch}
              refetch={refetch}
              isButtonDisabled={isButtonDisabled}
              setIsButtonDisabled={setIsButtonBDisabled}
            />
          ))}
      </div>
      <CartTotal
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonBDisabled}
      />
    </div>
  );
};

export default Cart;
