import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  ImageSourcePropType,
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
import { SEMI_BOLD } from "../../../constants/fontNames";
import Colors from "../../../constants/colors";

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

export function MenuItem({
  image,
  name,
  setQuery,
  query,
}: {
  image: ImageSourcePropType;
  name: string;
  setQuery: (name: string) => void;
  query: string;
}) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: query === name ? "#90c466CC" : undefined,
          borderColor: query === name ? "white" : "rgb(156 163 175)",
        },
      ]}
      onPress={() => setQuery(name)}
    >
      <Image resizeMode="contain" style={styles.image} source={image} />
      <Text
        style={[styles.text, { color: query === name ? "white" : Colors.dark }]}
      >
        {name}
      </Text>
    </Pressable>
  );
}

export function MenuItemsGrid({
  setQuery,
  query,
}: {
  setQuery: any;
  query: string;
}) {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 5,
        gap: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((item: TmenuItem, index: number) => (
        <MenuItem
          query={query}
          setQuery={setQuery}
          image={item.image as ImageSourcePropType}
          name={item.name}
          key={index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // inline-flex pb-2 bg-white    border border-gray-400  px-4 rounded-lg   items-center
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontFamily: SEMI_BOLD,
    fontSize: 14,
  },
});
