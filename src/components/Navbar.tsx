'use client'
import React, {useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import menuIcon from "../assets/menu-3-fill.svg";
import closeIcon from "../assets/close.svg";
import Image from "next/image";
import Link from "next/link";
import logo from '../assets/Logo.png'
import searchIcon from '../assets/search.svg'
import cart from '../assets/cart.svg'
import LinkC from "./LinkC";


const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery("(min-width:1000px)");
  const [selectedPage,setSelectedPage] = useState('/')


  return (
    <nav
      className={` z-40   w-full  absolute top-0 py-6 `}
    >
      <div className="flex  items-center justify-between mx-auto w-5/6 ">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src={logo}
            width={0}
            height={0}
            alt="logo"
            className="w-full h-full"
          />
        </Link>

        {/* DESKTOP NAVBAR */}
        {isAboveSmallScreens ? (
          <div className="flex h-full flex-1 items-center  gap-0  md:gap-0 text-md  ">
            <div className="flex flex-1  justify-center pt-2 md:gap-5 lg:gap-7 xl:gap-14">
              <LinkC
                page="Female"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkC
                page="Male"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkC
                page="Kids"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkC
                page="All Products"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </div>
            <div className="flex justify-end gap-x-10 items-center ">
              <div className="relative flex justify-center items-center">
                <input
                  type="search"
                  className="p-0.5 min-w-[280px] pl-8 placeholder:text-[14px] placeholder:font-normal text-gray-600  outline-none border rounded-md border-gray-300"
                  placeholder="What are you looking for"
                />
                <Image
                  className="absolute flex left-2  top-2"
                  src={searchIcon}
                  width={15}
                  height={16}
                  alt="search icon"
                />
              </div>

              <div className="bg-gray-200 relative h-11 w-11 p-1 flex justify-center items-center rounded-full ">
                <Image
                  className=""
                  src={cart}
                  width={25}
                  height={25}
                  alt="cart icon"
                />
                <p className="absolute flex justify-center items-center  bg-red-500 text-white top-0 right-1 h-5 w-5 text-[12px] rounded-full">
                  0
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="rounded-full bg-red p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <Image src={menuIcon} alt="menu-icon" />
          </button>
        )}

        {/* MOBILE MENU POPUP */}
        {!isAboveSmallScreens && isMenuToggled && (
          <div className="   fixed bg-white z-50 right-0 bottom-0 h-full  w-full">
            {/* CLOSE ICON FOR MOBILE MENU POPUP */}
            <div className="flex justify-end p-12">
              <button
                className=""
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Image
                  className="close-icon rounded-full bg-red p-2"
                  src={closeIcon}
                  width={43}
                  alt="close-icon"
                />
              </button>
            </div>

            {/* MENU ITEMS */}
            <div className="font-outfit flex flex-col gap-9 justify-center items-center  text-[20px] ">
              <LinkC
                page="Female"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isMenuToggled={isMenuToggled}
                setIsMenuToggled={setIsMenuToggled}
              />
              <LinkC
                page="Male"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isMenuToggled={isMenuToggled}
                setIsMenuToggled={setIsMenuToggled}
              />
              <LinkC
                page="Kids"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isMenuToggled={isMenuToggled}
                setIsMenuToggled={setIsMenuToggled}
              />
              <LinkC
                page="All Products"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isMenuToggled={isMenuToggled}
                setIsMenuToggled={setIsMenuToggled}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
