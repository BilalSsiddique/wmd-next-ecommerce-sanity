"use client";
import React, { useState, useEffect } from "react";
import menuIcon from "../assets/menu-3-fill.svg";
import closeIcon from "../assets/close.svg";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/Logo.png";
import searchIcon from "../assets/search.svg";
import cart from "../assets/cart.svg";
import LinkC from "./LinkC";
import {
  UserButton,
  SignInButton,
  SignedOut,
  SignedIn,
  ClerkLoaded,
} from "@clerk/nextjs";
import { IoLogIn } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useDineMarketContext } from "@/app/context/DineContext";
import { useAuth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "@/lib/cookie";

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [selectedPage, setSelectedPage] = useState("/");

  const pathname = usePathname();
  const { setCartItems, cartItems } = useDineMarketContext();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const getNumCartItems = React.useCallback(
    (userId: string) => {
      fetch(`${baseUrl}/api/numCartItems?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userId}`,
        },
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("respomse", response);
          if (response[0].numItems) {
            setCartItems(response[0].numItems);
          } else {
            setCartItems(0);
          }
        })
        .catch(() => {
          setCartItems(0);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [baseUrl, setCartItems]
  );

  useEffect(() => {
    const userId = getUser();
    if (!userId) {
      const newId = uuidv4();
      setUser(newId);
      setRefetch(!refetch);
    } else {
      getNumCartItems(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return (
    <nav className={` z-40   w-full  absolute top-0 py-6 `}>
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

        <div className="hidden lg:flex h-full flex-1 items-center  gap-0  md:gap-0 text-md  ">
          <div className="flex flex-1  justify-center pt-2 md:gap-5 lg:gap-7 xl:gap-12">
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
          <div className="flex justify-end gap-x-7 items-center ">
            <div className="relative flex justify-center items-center">
              <input
                type="search"
                className="p-0.5 min-w-[220px] pl-8 placeholder:text-[14px] placeholder:font-normal text-gray-600  outline-none border rounded-md border-gray-300"
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

            <Link href='/cart' className="bg-gray-200 relative h-10 w-10 p-1 flex justify-center items-center rounded-full ">
              <Image
                className=""
                src={cart}
                width={25}
                height={25}
                alt="cart icon"
              />
              <p className={`absolute ${loading && 'animate-pulse'} flex justify-center items-center  bg-red-500 text-white top-0 right-0 h-5 w-5 text-[12px] rounded-full`}>
                {!loading && cartItems }
              </p>
            </Link>
            {/* {!userId ? (
              <div className="gap-1 flex">
                <Link
                  className="p-2 text-sm  rounded-full bg-gray-200"
                  href="sign-up"
                >
                  <HiOutlineUserPlus size={20} />
                </Link>
                <Link
                  className="p-2  text-sm  rounded-full bg-gray-200"
                  href="sign-in"
                >
                  <TbLogin size={20} />
                </Link>
              </div>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )} */}

            <ClerkLoaded>
              <SignedIn>
                {isSignedIn == true ? (
                  <div>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal" redirectUrl={pathname}>
                  <button className="flex items-center justify-center ">
                    <div className="p-2  text-sm  rounded-full bg-gray-200">
                      <IoLogIn size={25} />
                    </div>
                  </button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
        </div>

        <button
          className="block lg:hidden rounded-full bg-red p-2"
          onClick={() => {
            setIsMenuToggled(!isMenuToggled);
          }}
        >
          <Image src={menuIcon} alt="menu-icon" />
        </button>

        {/* MOBILE MENU POPUP */}
        {isMenuToggled && (
          <div className="block lg:hidden   fixed bg-white z-50 right-0 bottom-0 h-full  w-full">
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
