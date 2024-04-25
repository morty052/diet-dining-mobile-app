import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const storage = new MMKV({
  id: "storage",
});

export const setItem = (key: string, value: string) => {
  storage.set(key, value);
  console.info("set", key, value);
};

export const getItem = (key: string) => {
  return storage.getString(key);
};

export const removeItem = (key: string) => {
  storage.delete(key);
  console.info("deleted", key);
};

export const zustandStorage: StateStorage = {
  setItem: (key: string, value: string) => {
    return storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    return storage.delete(key);
  },
};
