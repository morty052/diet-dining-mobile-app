import { create } from "zustand";
import { getValueFor } from "../lib/secure-store";

interface IsearchStore {
  fetchStoresAndProducts: () => void;
  products: [] | any[];
  stores: [] | any[];
}

export const useSearchStore = create<IsearchStore>((set, state) => {
  return {
    products: [],
    stores: [],
    fetchStoresAndProducts: async () => {
      // const res = await fetch(
      //   "https://ea0e-102-216-10-2.ngrok-free.app/stores/search-stores"
      // );
      // const res = await fetch("http://localhost:3000/stores/search-stores");
      const res = await fetch(
        "https://diet-dining-server.onrender.com/stores/search-stores"
      );

      const stores = await res.json();

      const productsRes = await fetch(
        "https://diet-dining-server.onrender.com/stores/search-products"
        // "http://localhost:3000/stores/search-products"
        // "https://ea0e-102-216-10-2.ngrok-free.app/stores/search-products"
      );

      const products = await productsRes.json();

      set((state) => ({
        products,
        stores,
      }));

      //
    },
  };
});
