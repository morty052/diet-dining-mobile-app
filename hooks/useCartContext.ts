// @ts-ignore
import { useContext } from "react";
import { CartContext, TCartContextType } from "../contexts/CartContext";

export const useCartContext = (): TCartContextType => useContext(CartContext);
