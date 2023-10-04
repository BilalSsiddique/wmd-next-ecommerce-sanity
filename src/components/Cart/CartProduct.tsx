import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { HiMinusSm } from "react-icons/hi";
import { getUser } from "@/lib/cookie";
import { useDineMarketContext } from "@/app/context/DineContext";
import { Toaster, toast } from "react-hot-toast";

interface CartProductProps {
  name: string;
  imageUrl: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
  cartId: number;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: boolean;
  isButtonDisabled: boolean;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartProduct: React.FC<CartProductProps> = ({
  name,
  imageUrl,
  type,
  size,
  price,
  quantity,
  cartId,
  refetch,
  setRefetch,
  isButtonDisabled,
  setIsButtonDisabled,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const userId = getUser();
  const [quant, setQuant] = useState(quantity);
  const [quantUpdated, setQuantUpdated] = useState(quant);

  const { decreaseCartItems } = useDineMarketContext();

  async function onUpdateHandle() {
    const toastId = toast.loading("updating cart");
    setIsButtonDisabled(true);
    fetch(`${baseUrl}/api/cartDetail`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        cartId: cartId,
        productQuantity: quantUpdated,
      }),
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);
        if (response.length != 0 && response[0].updatedQuantity) {
          decreaseCartItems(quant - quantUpdated);
          setQuant(response[0].updatedQuantity);
          setQuantUpdated(response[0].updatedQuantity);
          toast.success("cart updated");
        } else {
          console.log("response", response);
          toast.error("update failed");
        }
      })
      .catch((err) => {
        console.log("resoi", err);
        toast.dismiss(toastId);
        toast.error("update failed");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }

  async function onDeleteHandle() {
    setIsButtonDisabled(true);
    const toastId = toast.loading("deleting order");
    fetch(`${baseUrl}/api/cartDetail`, {
      method: "DELETE",
      headers: { Authorization: userId as string, cartId: cartId.toString() },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => {
        toast.dismiss(toastId);

        if (res.response == "success") {
          decreaseCartItems(quant);
          setRefetch(!refetch);
          toast.success("order deleted");
        } else {
          toast.error("delete failed");
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("delete failed");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }

  return (
    <div
      className="flex sm:flex-row flex-col w-full bg-[#f3f3f35d] rounded-md shadow-inner space-y-5 lg:space-y-0 sm:space-x-10  p-5"
      key={cartId}
    >
      <Image
        src={imageUrl}
        alt={name}
        className="rounded-md object-cover "
        width={200}
        height={200}
      />
      {/* CART PRODUCT DESCRIPTION */}
      <div className="space-y-6 flex-col flex-1">
        <div className="flex justify-between">
          <h1 className="font-semibold text-lg sm:text-xl">{name}</h1>

          <button
            disabled={isButtonDisabled}
            onClick={onDeleteHandle}
            className={`${
              !isButtonDisabled
                ? "cursor-pointer"
                : "cursor-not-allowed disabled:opacity-50"
            }`}
          >
            <RiDeleteBin4Line size={20} />
          </button>
        </div>
        <div className="text-[#666666] flex space-x-7">
          <p>{type}</p>
          <p>({size})</p>
        </div>
        <div className="flex h-10 justify-between font-semibold">
          <div>
            <h2>Delivery Estimation</h2>
            <h2 className="text-[#ffc700] ">5 Working Days</h2>
          </div>
          {quant != quantUpdated && (
            <button
              onClick={onUpdateHandle}
              className={` rounded-md w-fit px-3 py-0 bg-[#212121] text-white ${
                !isButtonDisabled
                  ? "cursor-pointer"
                  : "cursor-not-allowed disabled:opacity-50"
              }`}
              disabled={isButtonDisabled}
            >
              Update
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">${price * quantUpdated}</h1>

          <div className="flex text-gray-800 outline-none items-center gap-3">
            <button
              disabled={quantUpdated < 2}
              onClick={() => setQuantUpdated((previous) => previous - 1)}
              className="bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-100 shrink-0 cursor-pointer  flex place-items-center justify-center w-8 h-8 rounded-full "
            >
              <HiMinusSm size={20} />
            </button>
            <p className=" w-5 text-center">{quantUpdated}</p>
            <button
              disabled={quantUpdated >= 25}
              onClick={() => setQuantUpdated((previous) => previous + 1)}
              className="cursor-pointer  disabled:cursor-not-allowed disabled:text-gray-100 disabled:opacity-60   bg-gray-300 flex place-items-center justify-center w-8 h-8 rounded-full "
            >
              <BsPlus size={20} />
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default CartProduct;
