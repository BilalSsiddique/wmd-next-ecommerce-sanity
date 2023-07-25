import React from "react";
import Image from "next/image";
import logo from "../assets/Logo.png";
import Link from "next/link";
import { AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" ">
      <div className="grid  lg:gap-0 gap-10 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]  lg:grid-cols-[2fr,1fr,1fr,1fr] mx-5 sm:mx-auto sm:w-5/6 mb-[88px] lg:mb-[110px]">
        <div className="flex gap-y-7 flex-col items-start">
          <Link href="/">
            <Image src={logo} width={180} height={30} alt="logo" />
          </Link>
          <p className="text-[#666] w-3/5 lg:w-11/12 font-medium text-sm sm:text-base ">
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className="flex justify-start gap-x-5">
            <p className="bg-[#f1f1f1] px-3 py-3 rounded-lg">
              <AiOutlineTwitter size={25} className=" " />
            </p>
            <p className="bg-[#f1f1f1] px-3 py-3 rounded-lg">
              <RiFacebookFill size={25} className=" " />
            </p>
            <p className="bg-[#f1f1f1] px-3 py-3 rounded-lg">
              <FaLinkedinIn size={25} className=" " />
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm sm:text-base text-[#666]">
          <h2 className="font-bold  text-lg">Company</h2>
          <p>About</p>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>How it Works</p>
          <p>Contact Us</p>
        </div>
        <div className="space-y-2 text-sm sm:text-base text-[#666]">
          <h2 className="font-bold  text-lg">Support</h2>
          <p>Support Carrer</p>
          <p>24h Service</p>
          <p>Quick Chat</p>
        </div>
        <div className="space-y-2 text-sm sm:text-base text-[#666]">
          <h2 className="font-bold  text-lg">Contact</h2>
          <p>Whatsapp</p>
          <p>24h Service</p>
          <p>Support 24h</p>
        </div>
      </div>
      <hr />
      <div className="w-full  flex items-center pt-5 gap-y-2 justify-between text-sm sm:text-base gap-x-1 lg:gap-x-5 lg:gap-y-0 flex-wrap    mx-5 sm:mx-auto sm:w-5/6">
        <p className="w-fit">Copyright © 2023 Dine Market</p>
        <p className="w-fit">
          Design by. <span className="font-bold"> Weird Design Studio </span>
        </p>
        <p className="w-fit">
          Developed by. <span className="font-bold"> Bilal Siddique </span>
          <Link target="_blank" href="https://www.bilalsiddique.tech/">
            {" "}
            <br /> Portfolio:{" "}
            <span className="font-bold underline">
              {" "}
              www.bilalsiddique.tech{" "}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
