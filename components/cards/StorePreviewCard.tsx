import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TstoreProps from "../../types/Store";

type Props = {
  store: TstoreProps;
  fullWidth?: boolean;
};

export function StorePreviewCard({ store, fullWidth }: Props) {
  const navigation = useNavigation<any>();

  const { width: phoneWidth } = useWindowDimensions();

  const cardWidth = phoneWidth * 0.85;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Restaurant", {
          store_name: store.store_name,
          store_id: store._id,
          store_image: store.store_image,
        })
      }
    >
      <View className=" relative ">
        <Image
          resizeMode="cover"
          style={{
            width: !fullWidth ? cardWidth : "100%",
            height: 200,
          }}
          className="rounded-lg"
          source={{ uri: store.store_image }}
        />
        {/* OVERLAY */}
        <View className="absolute top-0 right-0 left-0 bottom-0 bg-black/10 rounded-lg "></View>
      </View>
      <View className="h-20  p-2 ">
        {/* DETAILS */}
        <View className="flex flex-row  justify-between">
          <View>
            <Text className="text-dark font-semibold text-[18px]">
              {store.store_name}
            </Text>
            <Text>{store.distance} Away</Text>
          </View>
          {/* RATING */}
          <View className="bg-primary h-10 w-10 rounded-full items-center justify-center">
            <Text className="font-medium text-[15px] text-white">
              {store.store_rating}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
