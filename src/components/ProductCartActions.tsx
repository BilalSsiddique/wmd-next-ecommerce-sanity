import React from "react";
import Image from "next/image";
import { IProduct } from "./ImageSection";
import { useState } from "react";
import cart from "@/assets/cart.svg";
import { BsPlus } from "react-icons/bs";
import { HiMinusSm } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import { useDineMarketContext } from "@/app/context/DineContext";
import { getUser } from "@/lib/cookie";

const ProductCartActions: React.FC<IProduct> = ({ productData }) => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [isBDisabled, setIsBDisabled] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const userId = getUser();
  const { increaseCartItems } = useDineMarketContext();

  async function addToCart() {
    const toastId = toast.loading("adding to cart");
    setIsBDisabled(true);
    if (userId) {
      fetch(`${baseUrl}/api/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userId}`,
        },
        body: JSON.stringify({
          productName: productData.title,
          productType: productData.productType.productType,
          productSlug: productData.slug.current,
          productImageUrl: productData?.imageUrls[0],
          productSelectedSize: selectedSize,
          productQuantity: productQuantity,
          productPrice: productData?.price,
        }),
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((response) => {
          toast.dismiss(toastId);

          if (response[0].product_quantity) {
            increaseCartItems(productQuantity);
            toast.success("added to cart");

          } else {
            toast.error("adding to cart failed");
          }
        })
        .catch((err) => {
          toast.dismiss(toastId);
          console.log("error", err);
          toast.error("adding to cart failed");
        })
        .finally(() => {
          setIsBDisabled(false);
        });
    }
  }

  return (
    <div className=" flex flex-col flex-1 gap-5 sm:gap-6 mdUpper:gap-0 py-16 justify-around w-full items-start pt-4 mdUpper:pt-0 mdUpper:pl-10">
      <h2 className="font-bold text-xl md:text-3xl  ">{productData.title}</h2>
      <div className="space-y-4 sm:space-y-3">
        <h2 className="text-sm font-semibold  ">SELECT SIZE</h2>
        <div className="flex flex-wrap gap-4 text-gray-500 ">
          {sizes.map((size, index) => (
            <div
              onClick={() => setSelectedSize(size)}
              key={index}
              className={` ${
                selectedSize === size
                  ? "bg-[#212121] text-white shadow-inner "
                  : "bg-gray-200"
              } cursor-pointer gap-3 w-10 h-10   text-center flex justify-center items-center rounded-full hover:shadow-sm hover:shadow-black`}
            >
              <p key={index}>{size}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 place-items-center pb-2 mdUpper:pb-0">
        <p className="font-bold">Quantity:</p>
        <div className="flex text-gray-800 outline-none items-center gap-3">
          <button
            disabled={productQuantity < 2}
            onClick={() => setProductQuantity((previous) => previous - 1)}
            className="bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-100 shrink-0 cursor-pointer  flex place-items-center justify-center w-8 h-8 rounded-full "
          >
            <HiMinusSm size={20} />
          </button>
          <p className=" w-5 text-center">{productQuantity}</p>
          <button
            disabled={productQuantity >= 25}
            onClick={() => setProductQuantity((previous) => previous + 1)}
            className="cursor-pointer  disabled:cursor-not-allowed disabled:text-gray-100 disabled:opacity-60   bg-gray-300 flex place-items-center justify-center w-8 h-8 rounded-full "
          >
            <BsPlus size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <p className="text-sm font-semibold">Total : </p>
        <p className="text-lg font-semibold">
          ${productData.price * productQuantity}.00
        </p>
      </div>

      <button
        disabled={isBDisabled}
        onClick={addToCart}
        className="border-custom justify-center flex items-center shadow-inner flex-row-reverse gap-x-2 w-fit  py-2 px-4 rounded-md bg-[#212121] text-white text-base"
      >
        <h1>Add to Cart</h1>
        <Image
          className="invert"
          src={cart}
          width={20}
          height={20}
          alt="cart icon"
        />
      </button>
      <Toaster position="top-center" />
    </div>
  );
};

export default ProductCartActions;
