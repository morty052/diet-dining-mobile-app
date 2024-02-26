// @ts-ignore
import { createContext, ReactNode, useState } from "react";
import { ImageSourcePropType } from "react-native";
import Toast from "react-native-root-toast";

export type TcartItem = {
  price: number;
  name: string;
  _id: string;
  quantity: number;
  total?: number;
  image?: ImageSourcePropType;
  vendor: {
    store_name: string;
    store_image: string;
  };
};

export type TCartContextType = {
  open: boolean;
  addToCart: (item: TcartItem) => void;
  cartItems: TcartItem[];
  getCartTotal: () => number;
  decreaseItemQuantity: (_id: string) => void;
  increaseItemQuantity: (_id: string) => void;
  removeItemFromCart: (_id: string) => void;
};

export const CartContext = createContext<TCartContextType>({
  open: false,
  addToCart: (item: TcartItem) => {},
  cartItems: [],
  getCartTotal: () => {},
  decreaseItemQuantity: () => {},
  removeItemFromCart: () => {},
  increaseItemQuantity: () => {},
});

const CartContextProvider = ({ children }: { children?: ReactNode }) => {
  const [cartItems, setCartItems] = useState<[] | TcartItem[]>([]);

  const checkCartForItem = (_id: string) => {
    const isAlreadyInCart = cartItems.find(
      (cartItem: TcartItem) => cartItem._id == _id
    );

    return isAlreadyInCart;
  };

  const increaseItemQuantity = (_id: string) => {
    const updatedCartItems = cartItems
      .map((item: TcartItem) => {
        if (item._id == _id) {
          const { quantity, price } = item;
          return {
            ...item,
            quantity: quantity + 1,
          };
        }
        return item;
      })
      .map((item: TcartItem) => {
        if (item._id == _id) {
          const { price, quantity } = item;
          return {
            ...item,
            total: price * quantity,
          };
        }
        return item;
      });
    setCartItems(updatedCartItems);
    console.info("updated cart", updatedCartItems);
  };

  const removeItemFromCart = (_id: string) => {
    const updatedCartItems = cartItems.filter(
      (cartItem: TcartItem) => cartItem._id != _id
    );

    setCartItems(updatedCartItems);
    console.info("removed item");
  };

  const decreaseItemQuantity = (_id: string) => {
    const updatedCartItems = cartItems.map((item: TcartItem) => {
      if (item._id == _id) {
        const { quantity, price, total } = item;
        return {
          ...item,
          quantity: quantity - 1,
          total: total - price,
        };
      }
      return item;
    });

    const updatedItem: TcartItem | undefined = updatedCartItems.find(
      (item: TcartItem) => item._id == _id
    );
    const { quantity } = updatedItem;
    if (quantity > 0) {
      setCartItems(updatedCartItems);
      console.info("decreased quantity", updatedCartItems);
      return;
    } else if (quantity <= 0) {
      removeItemFromCart(_id);
    }
  };

  const addToCart = (item: TcartItem) => {
    // DESTRUCTURE ITEM
    const { price, _id, name, quantity } = item;

    // CHECK IF ITEM IS ALREADY IN CART
    const isAlreadyInCart = checkCartForItem(_id);

    // ADD ITEM TO CART IF NOT PRESENT
    if (!isAlreadyInCart) {
      // SET INITIAL ITEM TOTAL TO ITEM PRICE MULTIPLIED BY INITIAL QUANTITY
      const newItem = {
        price,
        _id,
        name,
        quantity,
        total: price * quantity,
      };
      setCartItems((prev: TcartItem[]) => [...prev, newItem]);
      console.info("added Item to cart", newItem);
      Toast.show("Added to cart.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#90C466",
        textColor: "#ffffff",
        opacity: 1,
      });
      return;

      //   UPDATE QUANTITY AND TOTAL PRICE OF ITEM IF PRESENT
    } else if (isAlreadyInCart) {
      console.info("Already in Cart");
      increaseItemQuantity(_id);
      return;
    }
  };

  const getCartTotal = () => {
    const cartPrices: number[] | [] = cartItems.map(
      (item: TcartItem) => item.total
    );
    const total = cartPrices.reduce(
      (accumulator, currentvalue) => accumulator + currentvalue,
      0
    );
    console.info("total", total);
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        open: false,
        addToCart,
        cartItems,
        getCartTotal,
        decreaseItemQuantity,
        removeItemFromCart,
        increaseItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
