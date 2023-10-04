import React, { useState, useEffect } from "react";
import { getUser } from "@/lib/cookie";
import { useDineMarketContext } from "@/app/context/DineContext";
import toast from "react-hot-toast";
import getStripePromise from "@/lib/stripe";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { setTimeout } from "timers";

interface CartTotalProps {
  isButtonDisabled: boolean;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartTotal: React.FC<CartTotalProps> = ({
  isButtonDisabled,
  setIsButtonDisabled,
}) => {
  const userId = getUser();
  const { isSignedIn } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useDineMarketContext();

  async function getCartTotal(userId: string) {
    fetch(`${baseUrl}/api/cartTotal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId}`,
      },
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        setQuantity(response[0].quant);
        setPrice(response[0].price);
        setLoading(false);
      });
  }

  async function checkoutHandle() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const toastId = toast.loading("trying checkout");
    setIsButtonDisabled(true);
    const stripe = await getStripePromise();
    fetch(`${baseUrl}/api/checkout`, {
      method: "POST",
      headers: {
        Authorization: userId as string,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);

        if (response.success === false || !stripe) {
          toast.error("checkout failed");
          setIsButtonDisabled(false);
        } else {
          toast.loading("Redirecting...");
          stripe.redirectToCheckout({ sessionId: response.id });
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);
        toast.error("checkout failed");
        setIsButtonDisabled(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getCartTotal(userId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className=" flex shadow-inner gap-y-5 h-fit mt-5  flex-col basis-full lg:basis-1/5 xl:basis-1/3  justify-start bg-[#f3f3f35d] rounded-md lg:shadow-inner  p-5">
      <h1 className="font-bold text-lg w-full">Order Summary</h1>
      <div className="flex justify-between">
        <h1 className="font-medium">Quantity</h1>
        <h2>{quantity}</h2>
      </div>
      <div className="flex w-full justify-between ">
        <h1 className="font-medium">Sub Total</h1>
        <h2>${price}</h2>
      </div>
      <button
        onClick={checkoutHandle}
        disabled={isButtonDisabled}
        className={`  ${
          !isButtonDisabled
            ? "cursor-pointer"
            : "cursor-not-allowed disabled:opacity-50"
        }   border-custom whitespace-nowrap px-2 shadow-inner  gap-x-2 w-full  py-2  rounded-md bg-[#212121] text-white text-base`}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;
