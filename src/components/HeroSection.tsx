import React from "react";
import Image from "next/image";
import Link from "next/link";
import hero from "@/../public/hero.png";
import hero1 from "@/../public/hero1.png";
import hero2 from "@/../public/hero2.png";
import hero3 from "@/../public/hero3.png";
import hero4 from "@/../public/hero4.png";
import cart from "@/assets/cart.svg";

const HeroSection = () => {
  return (
    <div className="flex w-full space-y-0 flex-row items-start space-x-10  mx-5 sm:mx-auto sm:w-5/6">
      {/*Hero Section Left  */}
      <div className="flex flex-col space-y-10 lg:basis-5/12">
        {/* Left Text  */}
        <p className="mt-10 w-fit rounded-lg bg-blue-100 px-6 py-2 font-semibold text-[#0000FF]">
          Sale 70%
        </p>
        <h1 className="text-4xl w-[90%] sm:w-full sm:text-6xl font-bold tracking-wide text-[#212121]">
          An Industrial Take on Streetwear
        </h1>
        <p className="w-[75%] text-gray-600">
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>
        {/*Left button */}
        <Link href={"/products"} className="cursor-pointer">
          <button className="border-custom flex shadow-inner flex-row-reverse gap-x-2 w-fit  px-5 py-2 sm:py-3 sm:px-10 bg-[#212121] text-white text-base">
            Start Shopping
            <Image
              className="invert"
              src={cart}
              width={25}
              height={25}
              alt="cart icon"
            />
          </button>
        </Link>
        {/* Left promos */}
        <div className="flex w-[90%] sm:w-full flex-wrap items-center  justify-start gap-3 sm:gap-4">
          <Image src={hero1} alt="hero1" priority></Image>
          <Image src={hero2} alt="hero2" priority></Image>
          <Image src={hero3} alt="hero3" priority></Image>
          <Image src={hero4} alt="hero5" priority></Image>
        </div>
      </div>
      {/*** Hero Section right ***/}
      <div className="hidden basis-7/12 justify-end lg:flex">
        {/* Right Image */}
        <div className="h-[575px] w-[575px] overflow-visible rounded-full bg-[#ffece3]">
          <Image
            className="mx-auto -mt-2 h-[604px] w-[628px]"
            src={hero}
            alt="hero image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
