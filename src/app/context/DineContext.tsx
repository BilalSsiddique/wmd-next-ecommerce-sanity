"use client";
import React, { useState, SetStateAction, useContext } from "react";
import { createContext } from "react";

export type DineMarket = {
  cartItems: number;
};

type DineMarketContextType = {
  cartItems: number;
  increaseCartItems: (params: number) => void;
  decreaseCartItems: (params: number) => void;
  setCartItems: React.Dispatch<SetStateAction<number>>;
  fetchCompleted: boolean;
  setFetchCompleted: React.Dispatch<SetStateAction<boolean>>;
};

type DineMarketContextProviderProps = {
  children: React.ReactNode;
};

const DineMarketContext = createContext<DineMarketContextType >(
  {} as DineMarketContextType
);

export const DineMarketContextProvider = ({
  children,
}: DineMarketContextProviderProps) => {
  const [cartItems, setCartItems] = useState(0);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  function increaseCartItems(params: number) {
    let prev: number = Number(cartItems);
    setCartItems(prev + params);
  }

  function decreaseCartItems(params: number) {
    let prev: number = Number(cartItems);
    setCartItems(prev - params);
  }

  return (
    <DineMarketContext.Provider
      value={{
        cartItems,
        increaseCartItems,
        decreaseCartItems,
        setCartItems,
        fetchCompleted,
        setFetchCompleted,
      }}
    >
      {children}
    </DineMarketContext.Provider>
  );
};


export const useDineMarketContext = () => useContext<DineMarketContextType >(DineMarketContext)
