import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import HorizontalRule from "../../../components/ui/HorizontalRule";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import Animated from "react-native-reanimated";

const ItemInfo = ({
  price,
  name,
  image,
  description,
}: {
  price: number;
  name: string;
  image: any;
  description: string;
}) => {
  return (
    <>
      <Image
        resizeMode="contain"
        // className="w-full h-72"
        style={styles.image}
        source={{ uri: image }}
      />
      <View style={styles.container}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>${price}</Text>
        <View
          style={styles.ratingsContainer}
          className="flex flex-row gap-2 py-1"
        >
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star-outline" />
        </View>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 288,
  },
  container: {
    paddingHorizontal: 8,
  },
  itemName: {
    fontFamily: SEMI_BOLD,
    fontSize: 20,
    color: Colors.dark,
  },
  itemPrice: {
    fontFamily: SEMI_BOLD,
    fontSize: 20,
    color: "rgba(31 41 55 / 0.7)",
  },
  ratingsContainer: {},
  descriptionText: {
    color: "rgb(75 85 99)",
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ItemInfo;
