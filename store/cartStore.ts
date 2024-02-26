import { create } from "zustand";
import { TcartItem } from "../contexts/CartContext";
import Toast from "react-native-root-toast";

interface ICart {
  vendors: Ivendor[] | [];
  cartItems: TcartItem[] | [];
  itemsCount: number;
  addToCart: (item: TcartItem) => void;
  getCartTotal: () => number | undefined;
  decreaseItemQuantity: (_id: string) => void;
  increaseItemQuantity: (_id: string) => void;
  removeItemFromCart: (_id: string) => void;
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
  vendorItems: {
    item_name: string;
    item_price: number;
    item_id: string;
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

// const increaseVendorItemsCount = (store_name: string, vendors: Ivendor[]) => {
//   const vendorsItemsToIncrease = vendors.find(
//     (vendor) => vendor.store_name == store_name
//   );

//   return vendors.map((vendor) => {
//     if (vendor.store_name == vendorsItemsToIncrease?.store_name) {
//       return {
//         ...vendorsItemsToIncrease,
//         vendorTotal: 0,
//         vendorItemsCount: vendorsItemsToIncrease.vendorItemsCount + 1,
//       };
//     }

//     return vendor;
//   });
// };

const increaseItemQuantity = (_id: string, state: ICart) => {
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
          ? vendorsItemsToIncrease.vendorTotal + price
          : vendorsItemsToIncrease,
        vendorItemsCount: vendorsItemsToIncrease.vendorItemsCount + 1,
      };
    }

    return vendor;
  });

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
        // * INCREASE TOTAL PRICE OF ITEMS FOR TARGET VENDOR
        vendorTotal: price
          ? vendorsItemsToIncrease.vendorTotal + price
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

const removeItemFromCart = (_id: string, state: ICart) => {
  const itemtoRemove = state.cartItems.find((item) => item._id == _id);

  const updatedCartItems = state.cartItems.filter(
    (cartItem: TcartItem) => cartItem._id != _id
  );

  const { quantity, vendor } = itemtoRemove ?? {};
  const { store_name } = vendor ?? {};

  const vendorToUpdate = state.vendors.find(
    (vendor) => vendor.store_name == store_name
  );

  const { vendorItemsCount } = vendorToUpdate ?? {};

  if (quantity && (vendorItemsCount as number) - quantity <= 0) {
    const updatedVendors = state.vendors.filter(
      (vendor) => vendor.store_name != vendorToUpdate?.store_name
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
        vendorItems: quantity && vendor.vendorItemsCount - quantity,
      };
    }

    return vendor;
  });

  return {
    updatedCartItems,
    updatedVendors,
    quantity,
  };
};

const decreaseItemQuantity = (_id: string, state: ICart) => {
  // REDUCE QUANTITY VIA MAPPING ARRAY
  const updatedCartItems = state.cartItems.map((item: TcartItem) => {
    if (item._id == _id) {
      const { quantity, price, total } = item;
      return {
        ...item,
        quantity: quantity - 1,
        total: total && total - price,
      };
    }
    return item;
  });

  //   FIND UPDATED ITEM
  const updatedItem: TcartItem | undefined = updatedCartItems.find(
    (item: TcartItem) => item._id == _id
  );

  //   DESTRUCTURE QUANTITY FROM UPDATED ITEM IF IT EXISTS
  const { quantity } = updatedItem ?? { quantity: 0 };

  if (quantity > 0) {
    return {
      ...state,
      itemsCount: state.itemsCount - 1,
      cartItems: updatedCartItems,
    };
  } else if (quantity <= 0) {
    const decreasedCartItems = removeItemFromCart(_id, state);
    return {
      ...state,
      itemsCount: state.itemsCount - 1,
      cartItems: decreasedCartItems,
    };
  }

  return state;
};

const getCartTotalFromState = (cartItems: TcartItem[]) => {
  const cartPrices = cartItems.map((item: TcartItem) => item.total);
  const total = cartPrices.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue,
    0
  );
  return total;
};

const addToCart = (item: TcartItem, state: ICart) => {
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
    Toast.show("Added to cart.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: "#90C466",
      textColor: "#ffffff",
      opacity: 1,
    });

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

  await fetch("http://localhost:3000/orders/create", {
    method: "POST",
    body: JSON.stringify({ vendor }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useCartStore = create<ICart>((set, state) => ({
  cartItems: [],
  vendors: [],
  itemsCount: 0,
  total: 0,
  addToCart: (item) => {
    set((state) => addToCart(item, state));
  },
  // addToCart: (item) => addToCart(item, state()),
  decreaseItemQuantity: (_id) => {
    set((state) => decreaseItemQuantity(_id, state));
  },
  increaseItemQuantity: (_id) => {
    set((state) => increaseItemQuantityFromState(_id, state));
  },
  getCartTotal: () => {
    const { cartItems } = state();
    const total = getCartTotalFromState(cartItems);
    return total;
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

    set((state) => ({
      cartItems: updatedCartItems,
      vendors: updatedVendors,
      //* SUBTRACT VENDOR ITEMS COUNT FROM TOTAL ITEMS COUNT
      itemsCount: vendorItemsCount && state.itemsCount - vendorItemsCount,
      //* SUBTRACT VENDOR TOTAL FROM TOTAL ITEMS TOTAL
      total: vendorTotal && state.total && state.total - vendorTotal,
    }));
  },
  removeItemFromCart: (_id) => {
    const { updatedCartItems, updatedVendors, quantity } = removeItemFromCart(
      _id,
      state()
    );

    set((state) => ({
      cartItems: updatedCartItems,
      itemsCount: quantity && state.itemsCount - quantity,
      // vendors:updatedVendors
    }));
  },
}));
