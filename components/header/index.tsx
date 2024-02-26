import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../../store/cartStore";
import { SearchBar } from "../searchbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteKey } from "../../lib/secure-store";

const Badge = ({ count }: { count: number }) => {
  return (
    <View className="w-5 h-5 bg-red-500 absolute -top-4  -right-0 flex justify-center items-center   rounded-full">
      <Text className="text-xs text-white">{count}</Text>
    </View>
  );
};

export const Header = () =>
  //   {
  //   focused,
  //   setFocused,
  //   query,
  //   setQuery,
  // }: {
  //   focused: boolean;
  //   setFocused: boolean;
  //   query: string;
  //   setQuery: (search: string) => void;
  // }
  {
    const navigation = useNavigation();
    const { itemsCount } = useCartStore();

    return (
      <SafeAreaView
        edges={{
          bottom: "off",
          top: "additive",
        }}
        className="gap-4 "
      >
        <View className={styles.container}>
          <View className={styles.deliveryInfoContainer}>
            <Ionicons name="location-outline" size={25} color="black" />
            <View>
              <Text>Delivery - Now</Text>
              <TouchableOpacity onPress={() => deleteKey("ONBOARDED")}>
                <Text className={styles.locationText}>
                  Select Delivery Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className={styles.extraButtonsContainer}>
            <TouchableOpacity
              onPress={() =>
                // @ts-ignore
                navigation.navigate("Test", {
                  store_id: "bda93bf7-3060-46fd-bee4-692cabba7299",
                  store_name: "Papa Johns",
                })
              }
            >
              <Ionicons name="person-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              className="relative"
            >
              <Ionicons
                // @ts-ignore

                name="cart-outline"
                size={24}
                color="black"
              />
              {itemsCount > 0 && <Badge count={itemsCount} />}
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-2.5 border-b border-primary ">
          <SearchBar />
        </View>
      </SafeAreaView>
    );
  };

const styles = {
  container: "px-4 pt-4   flex items-center flex-row justify-between",
  extraButtonsContainer: "flex flex-row gap-x-4",
  deliveryInfoContainer: "flex-row items-center  gap-2",
  locationText: "text-dark font-semibold text-[16px]",
};
