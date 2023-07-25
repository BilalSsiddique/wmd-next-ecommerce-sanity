import React from "react";
import Image from "next/image";
import promotion1 from "../../public/promotion1.png";
import promotion2 from "../../public/promotion2.png";
import promotion3 from "../../public/promotion3.png";

import Link from "next/link";

const Promotions = () => {
  return (
    <div className=" flex flex-col justify-center items-center mx-5 sm:mx-auto sm:w-5/6">
      <h2 className="font-semibold text-[12px] text-[#0062f5]">PROMOTIONS</h2>
      <h1 className="text-[#212121] font-bold mt-4 text-xl sm:text-4xl mb-5">
        Our Promotions Events
      </h1>

      {/* GRID   */}
      <div className="items-center  w-full  grid gap-2 grid-rows-auto grid-cols-4 ">
        {/* 1ST GRID ITEM */}
        <div className=" h-full col-span-4 lg:col-span-2">
          <div className="sm:h-[220px]  flex flex-col sm:flex-row items-center justify-center sm:justify-between lg:justify-center px-2 bg-[#D6D6D8] ">
            <div>
              <h2 className="">
                <span className="flex mt-2 sm:mt-0  gap-2 sm:gap-0 sm:flex-col md:gap-2 md:flex-row text-2xl sm:text-3xl font-bold">
                  GET <span> UP </span> <span> TO </span>
                  <p className="font-extrabold   text-2xl sm:text-4xl ">60%</p>
                </span>
              </h2>
              <div className="md:text-xl">
                <p>For the summer season</p>
              </div>
            </div>
            <Image
              src={promotion1}
              width={0}
              height={0}
              sizes="100vw"
              className="place-self-end   mx-auto max-w-md"
              alt="promotions"
            />
          </div>
        </div>
        {/* 1ST GRID ITEM END */}

        {/* 2ND GRID ITEM START PROMO*/}
        <div className=" h-full row-start-2 col-span-4 lg:col-span-2">
          <div className="h-[220px]  gap-y-4 flex flex-col items-center justify-center px-2 bg-[#212121]  ">
            <h2 className="text-2xl sm:text-4xl  font-extrabold text-white ">
              GET 30% OFF
            </h2>
            <div className="flex flex-col items-center space-y-1">
              <h3 className="text-white text-sm">USE PROMO CODE</h3>
              <Link
                href=""
                className="bg-[#474747] font-bold tracking-[0.2em] text-white  w-fit px-1 sm:px-3 md:px-14 lg:px-8 xl:px-14 py-2 rounded-md"
              >
                DINEWEEKENDSALE
              </Link>
            </div>
          </div>
        </div>
        {/* 2ND GRID ITEM END */}

        {/* 3RD GRID ITEM START*/}
        <div className="bg-red-500 h-full col-span-4 md:col-span-2 lg:col-span-1 lg:row-span-2">
          <div className="h-full bg-[#EFE1C7] flex flex-col  pl-5 pt-5 justify-between items-start">
            <p className=" ">
              Flex Sweatshirt
              <br /> <span className="font-normal line-through">
                $100.00
              </span>{" "}
              <span className="font-bold">$75.00</span>
            </p>
            <Image
              src={promotion2}
              width={0}
              height={0}
              sizes="100vw"
              className=" place-self-center  w-[280px]  lg:w-[850px]"
              alt="promotions"
            />
          </div>
        </div>
        {/* 3RD GRID ITEM END */}

        {/* 4RTH GRID ITEM START*/}
        <div className="bg-pink-500 h-full col-span-4 md:col-span-2 justify-center lg:col-span-1 lg:row-span-2">
          <div className="h-full bg-[#d7d7d9] flex flex-col pt-5 pl-5 justify-between items-start ">
            <p className=" top-5 left-5 ">
              Flex Push Button Bomber <br />{" "}
              <span className="font-normal line-through">$225.00</span>{" "}
              <span className="font-bold">$190.00</span>
            </p>
            <Image
              src={promotion3}
              width={0}
              height={0}
              sizes="100vw"
              className=" place-self-center w-[280px]  lg:w-[850px]"
              alt="promotions"
            />
          </div>
        </div>
        {/* 4RTH GRID ITEM END*/}
      </div>
    </div>
  );
};

export default Promotions;
