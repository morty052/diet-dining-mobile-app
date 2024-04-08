import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../../store/cartStore";
import { SearchBar } from "../searchbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "../../store/locationStore";

const Badge = ({ count }: { count: number }) => {
  return (
    <View className="w-5 h-5 bg-red-500 absolute -top-4  -right-0 flex justify-center items-center   rounded-full">
      <Text className="text-xs text-white">{count}</Text>
    </View>
  );
};

export const Header = () => {
  const navigation = useNavigation();
  const { itemsCount } = useCartStore();
  const [loading, setLoading] = React.useState(false);
  const [addy, setAddy] = React.useState<string | boolean>("");

  const { setHeader, delivery_address } = useLocationStore();

  React.useEffect(() => {
    const getDeliveryAddress = async () => {
      await setHeader();
    };

    getDeliveryAddress();
  }, []);

  return (
    <SafeAreaView
      edges={{
        bottom: "off",
        top: "additive",
      }}
      className="gap-4 bg-white"
    >
      <View className={styles.container}>
        <View className={styles.deliveryInfoContainer}>
          <Ionicons
            // @ts-ignore
            onPress={() => navigation.navigate("LocationScreen")}
            name="location-outline"
            size={25}
            color="black"
          />
          <View>
            <Text>Delivery - Now</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
              // @ts-ignore
              onPress={() => navigation.navigate("LocationScreen")}
            >
              <Text className={styles.locationText}>
                {!delivery_address
                  ? " Select Delivery Location"
                  : delivery_address.toString().slice(0, 21)}
              </Text>
              <Ionicons size={10} name="chevron-down-outline" />
            </TouchableOpacity>
          </View>
        </View>
        <View className={styles.extraButtonsContainer}>
          <TouchableOpacity
            onPress={() =>
              // deleteKey("ONBOARDED")
              // @ts-ignore
              navigation.navigate("Account", {
                startingIndex: 1,
              })
            }
          >
            <Ionicons name="person-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate("Cart")}
            className="relative"
          >
            <Ionicons name="cart-outline" size={24} color="black" />
            {itemsCount > 0 && <Badge count={itemsCount} />}
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-2.5 border-b border-gray-300 ">
        <SearchBar />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: "px-4 pt-4   flex items-center flex-row justify-between ",
  extraButtonsContainer: "flex flex-row items-center gap-x-2",
  deliveryInfoContainer: "flex-row items-center  gap-2",
  locationText: "text-dark font-semibold text-[16px]",
};
