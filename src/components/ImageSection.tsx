"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProductCartActions from "./ProductCartActions";
// import Link from "next/link";

export interface IProduct {
  productData: {
    title: string;
    price: number;
    imageUrls: string[];
    productType: {productType:string};
    slug: { current: string; _type: string };
  };
}

const ImageSection: React.FC<IProduct> = ({ productData }) => {
  const [imageIndex, setImageIndex] = useState(0);

  

  return (
    <>
      <div className="mdUpper:flex bg-[#f3f3f35d] shadow-inner py-10 px-3 justify-between w-full justify-items-center">
        {/* small images */}
        <div
          className={`${
            productData.imageUrls.length > 1 ? "" : "flex-col-reverse"
          }  gap-2  sm:flex-row  flex justify-between `}
        >
          <div className="gap-2 flex flex-col justify-between ">
            {!!productData.imageUrls &&
              productData.imageUrls.map((imageItem, index) => (
                <Image
                  key={index}
                  src={imageItem}
                  className={`cursor-pointer object-cover ${
                    productData.imageUrls.length > 1 ? "h-full" : "h-auto"
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
              src={productData.imageUrls[imageIndex]}
              className="h-full w-full rounded-xl  object-cover  mx-auto "
              priority
              sizes="w-fit h-fit"
              width={0}
              height={0}
              quality={100}
              alt="product image"
            />
          </div>
        </div>

        {/* Product Description and Actions */}
        <ProductCartActions productData={productData} />
      </div>
    </>
  );
};

export default ImageSection;
