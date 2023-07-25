import React from "react";
import Link from "next/link";

const NewsLetter = () => {
  return (
    <div className="relative space-y-5 w-fit mx-auto px-5 sm:px-10">
      <h2 className=" font-bold text-xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#212121] ">
        <div className="text-5xl sm:text-6xl md:text-9xl pointer-events-none absolute left-0 right-0  flex justify-center items-center font-extrabold h-full md:leading-[115px]  z-10 text-[#212121] opacity-[0.05]">
          Newsletter
        </div>
        Subscribe Our Newsletter
      </h2>
      <p className=" font-light mx-auto w-fit text-sm sm:text-base">
        Get the latest information and promo offers directly
      </p>
      <div className="flex ">
        <input
          placeholder="Enter Email Adress"
          className=" shadow-inner  px-5 w-full  sm:flex-1 border  outline-none"
          type="email"
          name=""
          id=""
        />
        <Link href={"/products"} className="cursor-pointer">
          <button className="shadow-inherit border-custom  w-fit  px-6 py-1 sm:px-3 sm:py-2  font-bold   bg-[#000] text-white text-xs sm:text-sm ">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsLetter;
