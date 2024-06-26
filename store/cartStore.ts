import { create } from "zustand";
import Toast from "react-native-root-toast";
import { getItem } from "../utils/storage";
import { baseUrl } from "../constants/baseUrl";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "../utils/storage";
import { TcartItem } from "../types/TCartItem";

interface ICart {
  vendors: Ivendor[] | [];
  cartItems: TcartItem[] | [];
  itemsCount: number;
  addToCart: (item: TcartItem) => void;
  getCartTotal: () => number | undefined;
  increaseItemQuantity: (_id: string) => void;
  getVendor: (store_name: string) => Ivendor | undefined;
  removeItemFromCart: (
    _id: string,
    store_name: string,
    item_quantity: number
  ) => void;
  addNoteToOrder: ({
    store_name,
    order_note,
  }: {
    store_name: string;
    order_note: string;
  }) => void;
  handleCheckout: (store_name: string) => void;
  total?: number;
}

export interface Ivendor {
  _id: string;
  store_name: string;
  store_image: string;
  store_logo: string;
  vendorTotal: number;
  vendorItemsCount: number;
  vendorNote?: string;
  vendorDriverNote?: string;
  vendorItems: {
    item_name: string;
    item_price: number;
    item_id: string;
    item_quantity: number;
  }[];
}

const checkCartForItem = (_id: string, cartItems: TcartItem[]) => {
  const isAlreadyInCart = cartItems.find(
    (cartItem: TcartItem) => cartItem._id == _id
  );

  return isAlreadyInCart;
};

const checkCartForVendor = (store_name: string, vendors: Ivendor[]) => {
  const vendorCheck = vendors.filter(
    (vendor: Ivendor) => vendor.store_name == store_name
  );

  if (vendorCheck.length > 0) {
    return vendorCheck[0];
  }

  return false;
};

const increaseItemQuantity = (_id: string, quantity: number, state: ICart) => {
  const itemToUpdate = state.cartItems.find((item) => item._id == _id);

  const { vendor, price } = itemToUpdate ?? {};

  const { store_name } = vendor ?? {};

  const vendorsItemsToIncrease = state.vendors.find(
    (vendor) => vendor.store_name == store_name
  );

  const updatedVendors = state.vendors.map((vendor) => {
    if (vendor.store_name == vendorsItemsToIncrease?.store_name) {
      return {
        ...vendorsItemsToIncrease,
        vendorTotal: price
          ? vendorsItemsToIncrease.vendorTotal + price * quantity
          : vendorsItemsToIncrease,
        vendorItemsCount: vendorsItemsToIncrease.vendorItemsCount + quantity,
        vendorItems: vendor.vendorItems.map((item) => {
          if (item.item_id == _id) {
            return {
              ...item,
              item_quantity: item.item_quantity + quantity,
            };
          }

          return item;
        }),
      };
    }

    return vendor;
  });

  const updatedCartItems = state.cartItems.map((item: TcartItem) => {
    if (item._id == _id) {
      const { price } = item;
      return {
        ...item,
        quantity: item.quantity + quantity,
        total: item.price * quantity + item.quantity,
      };
    }
    return item;
  });
  // .map((item: TcartItem) => {
  //   if (item._id == _id) {
  //     const { price, quantity } = item;
  //     return {
  //       ...item,
  //       total: price * quantity,
  //     };
  //   }
  //   return item;
  // });
  return {
    updatedCartItems,
    updatedVendors,
  };
};

const increaseVendorItemQuantity = (
  store_name: string,
  item: TcartItem,
  state: ICart
) => {
  // * DESTRUCTURE ITEM
  const { price, quantity, name, _id } = item;

  // * CHECK FOR VENDOR
  const vendorsItemsToIncrease = state.vendors.find(
    (vendor) => vendor.store_name == store_name
  );

  // * CREATE NEW ARRAY TO MODIFY TARGET VENDOR
  const updatedVendors = state.vendors.map((vendor) => {
    if (vendor.store_name == vendorsItemsToIncrease?.store_name) {
      return {
        ...vendorsItemsToIncrease,
        // * INCREASE TOTAL PRICE OF ITEMS FOR TARGET VENDOR BY ADDING PRICE OF ITEM MULTIPLIED BY QUANTITY
        vendorTotal: price
          ? vendorsItemsToIncrease.vendorTotal + price * quantity
          : vendorsItemsToIncrease.vendorTotal,
        // * INCREASE TOTAL ITEMS COUNT FOR TAGERT VENDOR BY ADDING QUANITY OF NEW ITEM
        vendorItemsCount: vendorsItemsToIncrease.vendorItemsCount + quantity,
        // * ADD ITEM TO VENDORS ARRAY
        vendorItems: [
          ...vendorsItemsToIncrease.vendorItems,
          {
            item_name: name,
            item_price: price,
            item_id: _id,
            item_quantity: quantity,
          },
        ],
      };
    }

    return vendor;
  });

  return {
    updatedVendors,
  };
};

const increaseItemQuantityFromState = (_id: string, state: ICart) => {
  const updatedCartItems = state.cartItems
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

  return {
    cartItems: updatedCartItems,
    itemsCount: state.itemsCount + 1,
  };
};

const removeItemFromCart = ({
  store_name,
  item_id,
  item_quantity,
  state,
}: {
  store_name: string;
  item_id: string;
  item_quantity: number;
  state: ICart;
}) => {
  // * FILTER OUT ITEM FROM CARTITEMS
  const updatedCartItems = state.cartItems.filter(
    (cartItem: TcartItem) => cartItem._id != item_id
  );

  // * FIND VENDOR THAT MATCHES @Param STORE_NAME,
  const vendorToUpdate = state.vendors.find(
    (vendor: Ivendor) => vendor.store_name == store_name
  );

  //* DESCTRUCTURE VENDOR ITEMS COUNT FROM VENDOR
  const { vendorItemsCount } = vendorToUpdate ?? {};

  // * REMOVE VENDOR FROM LIST IF VENDORS ITEMS MINUS @param ITEM_QUANTITY EQUALS 0
  if (vendorItemsCount && vendorItemsCount - item_quantity <= 0) {
    const updatedVendors = state.vendors.filter(
      (vendor) => vendor.store_name != store_name
    );
    return {
      updatedCartItems,
      updatedVendors,
    };
  }

  const updatedVendors = state.vendors.map((vendor) => {
    if (vendor.store_name == store_name) {
      return {
        ...vendor,
        // * FILTER OUT ITEM FROM VENDOR ITEMS
        vendorItems: vendor.vendorItems.filter(
          (vendorItem) => item_id != vendorItem.item_id
        ),
        // * SUBTRACT ITEM_QUANTITY FROM VENDOR ITEMS COUNT
        vendorItemsCount: vendor.vendorItemsCount - item_quantity,
      };
    }

    return vendor;
  });

  return {
    updatedCartItems,
    updatedVendors,
  };
};

const getCartTotalFromState = (cartItems: TcartItem[]) => {
  const cartPrices = cartItems.map((item: TcartItem) => item.total);
  const total = cartPrices.reduce(
    // FIXME: ADD PROPER TYPING
    // @ts-ignore
    (accumulator, currentvalue) => accumulator + currentvalue,
    0
  );
  return total;
};

const addToCart = (item: TcartItem, state: any) => {
  //* DESTRUCTURE ITEM
  const { price, _id, name, quantity, image, vendor } = item;

  //* CHECK IF ITEM IS ALREADY IN CART
  const isAlreadyInCart = checkCartForItem(_id, state.cartItems);

  //* CHECK IF VENDOR EXISTS IN CART VENDORS ARRAY
  const vendorExists = checkCartForVendor(vendor.store_name, state.vendors);

  //* ADD ITEM TO CART IF NOT PRESENT
  if (!isAlreadyInCart) {
    const newItem = {
      price,
      _id,
      name,
      quantity,
      image,

      //* SET INITIAL ITEM TOTAL TO ITEM PRICE MULTIPLIED BY INITIAL QUANTITY
      total: price * quantity,

      //* ADD VENDOR TO CART ITEM
      vendor,
    };

    // * CREATE NEW VENDOR
    const newVendor = {
      ...vendor,
      //* SET INITIAL VENDOR TOTAL TO ITEM PRICE MULTIPLIED BY INITIAL QUANTITY

      // * SET INITIAL VENDOR TOTAL ITEMS COUNT TO ITEM QUANTITY
      vendorTotal: price * quantity,
      vendorItemsCount: quantity,
      vendorItems: [
        {
          item_name: name,
          item_price: price,
          item_id: _id,
          item_quantity: quantity,
        },
      ],
    };

    if (!vendorExists) {
      return {
        ...state,
        itemsCount: state.itemsCount + quantity,
        vendors: [...state.vendors, newVendor],
        cartItems: [...state.cartItems, newItem],
      };
    }

    if (vendorExists) {
      const { updatedVendors } = increaseVendorItemQuantity(
        vendor.store_name,
        item,
        state
      );

      return {
        ...state,
        itemsCount: state.itemsCount + quantity,
        vendors: updatedVendors,
        cartItems: [...state.cartItems, newItem],
      };
    }

    //*   UPDATE QUANTITY AND TOTAL PRICE OF ITEM IF PRESENT
  } else if (isAlreadyInCart) {
    const { updatedCartItems, updatedVendors } = increaseItemQuantity(
      _id,
      quantity,
      state
    );

    if (!vendorExists) {
      return {
        ...state,
        itemsCount: state.itemsCount + 1,
        // vendors: [...state.vendors, vendor],
        cartItems: [...state.cartItems, updatedCartItems],
      };
    }

    Toast.show("Added to cart.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: "#90C466",
      textColor: "#ffffff",
      opacity: 1,
    });

    return {
      ...state,
      itemsCount: state.itemsCount + 1,
      cartItems: updatedCartItems,
      vendors: updatedVendors,
    };
  }

  return state;
};

const handleCheckout = async (store_name: string, vendors: Ivendor[]) => {
  const vendor = vendors.find((vendor) => vendor.store_name == store_name);

  const latitude = getItem("latitude");
  const longitude = getItem("longitude");
  const user_location = {
    lat: Number(latitude),
    lng: Number(longitude),
  };

  const delivery_address = getItem("DELIVERY_ADDRESS");

  try {
    const user_push_token = getItem("expo_push_token");
    const user_id = getItem("user_id");
    const url = `${baseUrl}/orders/create`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        vendor,
        user_id,
        user_push_token,
        user_location,
        delivery_address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const useCartStore = create(
  persist<ICart>(
    (set, state) => ({
      cartItems: [],
      vendors: [],
      itemsCount: 0,
      total: 0,
      addToCart: (item) => {
        set((state) => addToCart(item, state));
      },
      // addToCart: (item) => addToCart(item, state()),
      increaseItemQuantity: (_id) => {
        set((state) => increaseItemQuantityFromState(_id, state));
      },
      getCartTotal: () => {
        const { cartItems } = state();
        const total = getCartTotalFromState(cartItems);
        return total;
      },
      getVendor: (store_name) => {
        const activeVendor = state().vendors.find(
          (vendor) => vendor.store_name == store_name
        );

        return activeVendor as Ivendor | undefined;
      },
      addNoteToOrder: ({ store_name, order_note }) => {
        const vendorToUpdate = state().vendors.find(
          (vendor) => vendor.store_name == store_name
        );

        const updatedVendors = state().vendors.map((vendor) => {
          if (vendor.store_name == store_name) {
            return {
              ...vendor,
              vendorNote: order_note,
            };
          }
          return vendor;
        });

        set((state) => ({
          vendors: updatedVendors,
        }));
      },
      removeItemFromCart: (item_id, store_name, item_quantity) => {
        const { updatedCartItems, updatedVendors } = removeItemFromCart({
          item_id,
          store_name,
          state: state(),
          item_quantity,
        });

        set((state) => ({
          cartItems: updatedCartItems,
          // * SUBTRACT ITEMS QUANTITY FROM STATES ITEMS COUNT
          itemsCount: state.itemsCount - item_quantity,
          vendors: updatedVendors as Ivendor[],
        }));
      },
      handleCheckout: (store_name) => {
        handleCheckout(store_name, state().vendors);

        // * FILTER OUT VENDOR BEING CHECKED OUT FROM VENDORS ARRAY
        const updatedVendors = state().vendors.filter(
          (vendor) => vendor.store_name != store_name
        );

        // * GET VENDOR BEING CHECKED OUT USING NAME
        const checkedOutVendor = state().vendors.find(
          (vendor) => vendor.store_name == store_name
        );

        const { vendorItemsCount, vendorTotal } = checkedOutVendor ?? {};

        // * REMOVE ALL ITEMS FROM CART THAT BELONGS TO VENDOR
        const updatedCartItems = state().cartItems.filter(
          (item) => item.vendor.store_name != store_name
        );

        // * UPDATE CART STATE
        set((state) => ({
          cartItems: updatedCartItems,
          vendors: updatedVendors,
          //* SUBTRACT VENDOR ITEMS COUNT FROM TOTAL ITEMS COUNT
          itemsCount: vendorItemsCount && state.itemsCount - vendorItemsCount,
          //* SUBTRACT VENDOR TOTAL FROM TOTAL ITEMS TOTAL
          total: vendorTotal && state.total && state.total - vendorTotal,
        }));
      },
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
