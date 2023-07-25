"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cart from "@/assets/cart.svg";

interface ImageProps {
  urls: string[];
  productData: {
    title: string;
    price: number;
  };
}

const ImageSection: React.FC<ImageProps> = ({ urls, productData }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [productQuantity,setProductQuantity] = useState(1)

  // const validateProductQuantity = 

  
  return (
    <>
      <div className="mdUpper:flex justify-between w-full justify-items-center">
        {/* small images */}
        <div
          className={`${
            urls.length > 1 ? "" : "flex-col-reverse"
          }  gap-2  sm:flex-row  flex justify-between `}
        >
          <div className="gap-2 flex flex-col justify-between ">
            {!!urls &&
              urls.map((imageItem, index) => (
                <Image
                  key={index}
                  src={imageItem}
                  className={`cursor-pointer object-cover ${
                    urls.length > 1 ? "h-full" : "h-auto"
                  }  w-[100px]`}
                  priority
                  alt="product Image"
                  width={100}
                  height={100}
                  quality={100}
                  onMouseEnter={() => setImageIndex(index)}
                />
              ))}
          </div>
          {/* Full Image */}
          <div className="w-full h-[58vh]  sm:h-[72vh] flex-2 sm:pl-4">
            <Image
              src={urls[imageIndex]}
              className="h-full w-full  object-cover  mx-auto "
              priority
              sizes="w-fit h-fit"
              width={0}
              height={0}
              quality={100}
              alt="product image"
            />
          </div>
        </div>

        <div className=" flex flex-col flex-1 gap-2 sm:gap-5 mdUpper:gap-0 py-16 justify-around w-full items-start pt-4 mdUpper:pt-0 mdUpper:pl-10">
          <h2 className="font-bold text-lg sm:text-2xl  ">
            {productData.title}
          </h2>
          <div className="space-y-1">
            <h2 className="text-base font-semibold ">SELECT SIZE</h2>
            <div className="flex gap-4 text-gray-500 font-bold">
              <div className="cursor-pointer w-8 h-8 text-center flex justify-center items-center rounded-full hover:shadow-sm hover:shadow-black">
                <p>XS</p>
              </div>
              <div className="cursor-pointer w-8 h-8 text-center flex justify-center items-center rounded-full hover:shadow-sm hover:shadow-black">
                <p>S</p>
              </div>
              <div className="cursor-pointer w-8 h-8 text-center flex justify-center items-center rounded-full hover:shadow-sm hover:shadow-black">
                <p>M</p>
              </div>
              <div className="cursor-pointer w-8 h-8 text-center flex justify-center items-center rounded-full hover:shadow-sm hover:shadow-black">
                <p>L</p>
              </div>
              <div className="cursor-pointer w-8 h-8 text-center flex justify-center items-center rounded-full hover:shadow-sm hover:shadow-black">
                <p>XL</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 place-items-center pb-2 mdUpper:pb-0">
            <p className="font-bold">Quantity:</p>
            <div className="flex text-gray-800 outline-none items-center gap-3">
              <button
              disabled={productQuantity < 2 }
                onClick={() => setProductQuantity((previous) => previous - 1)}
                className="bg-gray-300 disabled:text-gray-100 cursor-pointer  flex place-items-center justify-center w-8 h-8 rounded-full "
              >
                <p className="font-bold text-xl">-</p>
              </button>
              <p className="font-semibold">
                {productQuantity }
              </p>
              <button
                onClick={() => setProductQuantity((previous) => previous + 1)}
                className="cursor-pointer bg-gray-300 flex place-items-center justify-center w-8 h-8 rounded-full "
              >
                <p className="font-bold text-xl">+</p>
              </button>
            </div>
          </div>

          <button className="border-custom flex shadow-inner flex-row-reverse gap-x-2 w-fit  py-2 px-2 bg-[#212121] text-white text-base">
            Add to Cart
            <Image
              className="invert"
              src={cart}
              width={20}
              height={20}
              alt="cart icon"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageSection;
