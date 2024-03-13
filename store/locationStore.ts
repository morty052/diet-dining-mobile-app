import { create } from "zustand";
import { getValueFor } from "../lib/secure-store";

interface IlocationStore {
  delivery_address: string | boolean;
  setHeader: () => void;
}

export const useLocationStore = create<IlocationStore>((set, state) => {
  return {
    delivery_address: "",
    setHeader: async () => {
      const delivery_address = await getValueFor("DELIVERY_ADDRESS");
      console.info("settingHeader", delivery_address);
      set({
        delivery_address,
      });
    },
  };
});
