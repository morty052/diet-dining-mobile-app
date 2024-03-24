import { create } from "zustand";
import { getItem } from "../utils/storage";

interface IlocationStore {
  delivery_address: string | boolean;
  setHeader: () => void;
}

export const useLocationStore = create<IlocationStore>((set, state) => {
  return {
    delivery_address: "",
    setHeader: async () => {
      const delivery_address = getItem("DELIVERY_ADDRESS");
      console.info("settingHeader", delivery_address);
      set({
        delivery_address,
      });
    },
  };
});
