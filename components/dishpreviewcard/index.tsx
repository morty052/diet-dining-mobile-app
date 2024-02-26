import {
  ImageSourcePropType,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { TcartItem } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Animated, {
  BounceIn,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";

function AddToCartButton({
  addToCart,
  _id,
  cartItems,
}: {
  addToCart: (t: any) => void;
  _id: string;
  cartItems: TcartItem[];
}) {
  const count = useMemo(() => {
    const cartItem = cartItems?.find((cartItem: any) => cartItem._id == _id);

    if (cartItem) {
      return cartItem.quantity;
    }

    return false;
  }, [cartItems, _id]);

  return (
    <TouchableOpacity onPress={addToCart}>
      <View
        className={`border px-4 w-32 inline-flex items-center py-2 rounded-3xl border-dark `}
      >
        {!count && (
          <Animated.Text exiting={FadeOutLeft} className="text-xs font-medium">
            {count ? ` (${count}) In Cart` : "Add to cart"}
          </Animated.Text>
        )}
        {count && (
          <Animated.View entering={FadeInRight}>
            <Animated.Text
              entering={BounceIn}
              className={`text-xs font-medium ${count ? "text-white" : ""}}`}
            >
              {count ? ` (${count}) In Cart` : "Add to cart"}
            </Animated.Text>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
}
function LikeButton({ setLiked, liked }: any) {
  return (
    <Pressable
      onPress={() => setLiked(!liked)}
      className="absolute top-2 right-4"
    >
      <Feather name="heart" size={24} color={liked ? "red" : "black"} />
    </Pressable>
  );
}

export function DishPreviewCard({
  title,
  image,
  addToCart,
  _id,
  cartItems,
  direction,
}: {
  title: string;
  image: ImageSourcePropType;
  _id: string;
  addToCart: (t: any) => void;
  cartItems: TcartItem[];
  direction?: boolean;
}) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState();

  return (
    <TouchableOpacity
      className={`flex-1 bg-white rounded-lg  w-[80vw] ${
        !direction ? "mr-6" : "mb-6 w-full"
      }`}
    >
      <Pressable
        onPress={() =>
          // @ts-ignore
          navigation.navigate("FoodScreen", {
            _id: _id,
            title: title,
            image: image,
          })
        }
        className="relative border-b"
      >
        <Image
          resizeMode="cover"
          source={image}
          className="w-full  h-40 rounded-xl"
        />

        {/* OVERLAY */}
        {/* <View className="absolute rounded-xl top-0 bottom-0 left-0 right-0 bg-black/20 "></View> */}
      </Pressable>
      {/* LIKEBUTTON */}
      <LikeButton liked={liked} setLiked={setLiked} />
      {/* ITEMS DETAILS ? BUY BUTTON */}
      <View className="px-2 py-4 flex flex-row items-center justify-between">
        <View className="flex">
          <Text className=" font-medium">{title}</Text>
          <Text className="text-lg">$15.00</Text>
        </View>
        <AddToCartButton
          cartItems={cartItems}
          _id={_id}
          addToCart={addToCart}
        />
      </View>
    </TouchableOpacity>
  );
}
