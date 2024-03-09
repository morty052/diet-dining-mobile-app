import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
  console.log("saved", `key: ${key}, value:${value}`);
}

async function getValueFor(key: string): Promise<string | boolean> {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.warn("Key not found", key);
    return false;
  }
}
async function deleteKey(key: string) {
  await SecureStore.deleteItemAsync(key);
  console.log("DELETED", key);
}

export { save, getValueFor, deleteKey };
