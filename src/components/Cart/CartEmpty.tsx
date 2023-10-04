/**
 * Empty cart componet
 * to be displayed when no items in the cart
 */
import React from "react";
import { RiShoppingBag3Line } from "react-icons/ri";

export const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <RiShoppingBag3Line size={150} />
      <p className="text-2xl font-bold text-[#212121] mt-6">
        Your shopping bag is empty
      </p>
    </div>
  );
};
