import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type TmenuItem = {
  image: string;
  name: string;
};

export function MenuItem({ image, name }: any) {
  const navigationParams = {
    activeCategory: name == "Sea food" ? "SeaFoods" : name,
  };
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("FoodMenu", navigationParams)}
      className=" inline-flex pb-2 bg-white shadow   border border-gray-400  mr-4 px-4 rounded-lg   items-center"
    >
      {/* <SvgComponent /> */}
      <Image resizeMode="contain" className="w-20 h-20" source={image} />
      <Text className="text-sm font-bold text-dark">{name}</Text>
    </TouchableOpacity>
  );
}

export function MenuItemsGrid({ categories }: any) {
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
