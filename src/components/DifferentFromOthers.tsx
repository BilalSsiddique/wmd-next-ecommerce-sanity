import React from "react";
import Image from "next/image";
import different from "../../public/different.png";
import Link from "next/link";

const DifferentFromOthers = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Heading */}
      <div className="flex relative top-12 justify-start lg:justify-center xl:justify-end mx-5 sm:mx-auto sm:w-5/6 ">
        <h2 className="font-bold text-4xl  sm:text-5xl w-full lg:w-4/5 xl:w-[45%] ">
          Unique and Authentic Vintage Designer Jewellery
        </h2>
      </div>

      {/* section */}
      <div className="bg-[#fbfcff] overflow-hidden shadow-inner py-20">
        <div className="xl:flex overflow-hidden  h-full gap-x-20  mx-5 sm:mx-auto sm:w-5/6">
          {/* Text */}
          <div className="relative overflow-hidden flex justify-between gap-x-5 lg:gap-x-10 flex-1 mb-10 sm:mb-0 ">
            <div className="absolute overflow-hidden font-extrabold h-full md:leading-[115px] text-8xl z-10 text-[#212121] opacity-[0.07]">
              Different from others
            </div>
            <div className="space-y-12 sm:h-[300px]">
              <div className="space-y-5">
                <h3 className="font-bold sm:text-lg xl:tracking-widest">
                  Using Good Quality Materials
                </h3>
                <p className="font-light">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
              <div className="space-y-5">
                <h3 className="font-bold sm:text-lg xl:tracking-widest">
                  Modern Fashion Design
                </h3>
                <p className="font-light">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            <div className="space-y-12  sm:h-[300px]">
              <div className="space-y-5 ">
                <h3 className="font-bold sm:text-lg xl:tracking-widest">
                  100% Handmade Products
                </h3>
                <p className="font-light">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
              <div className="space-y-5 ">
                <h3 className="font-bold sm:text-lg">
                  Discount for Bulk Orders
                </h3>
                <p className="font-light">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="sm:flex justify-start sm:justify-between space-y-12 sm:space-y-0 sm:space-x-14  basis-[54%]">
            <Image
              src={different}
              width={300}
              height={350}
              alt="product image"
            />
            <div className="flex  flex-col w-full place-items-start gap-y-3 sm:gap-y-10 sm:justify-center lg:justify-between">
              <p className="font-light text-base">
                This piece is ethically crafted in our small family-owned
                workshop in Peru with unmatched attention to detail and care.
                The Natural color is the actual natural color of the fiber,
                undyed and 100% traceable.
              </p>
              <Link href={"/products"} className="cursor-pointer">
                <button className="border-custom justify-center flex items-center shadow-inner flex-row-reverse gap-x-2 w-fit  py-2 px-4 rounded-md bg-[#212121] text-white text-base">
                  See All Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentFromOthers;
