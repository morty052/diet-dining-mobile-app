import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  desserts_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
  chinese_emoji,
} from "../../../assets/foodcategories";

type TmenuItem = {
  image: string;
  name: string;
};

const categories = [
  {
    name: "Desserts",
    image: desserts_emoji,
  },
  {
    name: "Sea food",
    image: seafoods_emoji,
  },
  {
    name: "Salads",
    image: salads_emoji,
  },
  {
    name: "Chinese",
    image: chinese_emoji,
  },
  {
    name: "Soups",
    image: soups_emoji,
  },
];

export function MenuItem({ image, name }: any) {
  const navigationParams = {
    category: name,
  };
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("Browse", navigationParams)}
      className=" inline-flex pb-2 bg-white shadow   border border-gray-400  mr-4 px-4 rounded-lg   items-center"
    >
      {/* <SvgComponent /> */}
      <Image resizeMode="contain" className="w-20 h-20" source={image} />
      <Text className="text-sm font-bold text-dark">{name}</Text>
    </TouchableOpacity>
  );
}

export function MenuItemsGrid() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 5,
      }}
      horizontal
    >
      {categories.map((item: TmenuItem, index: number) => (
        <MenuItem image={item.image} name={item.name} key={index} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
