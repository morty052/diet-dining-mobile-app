import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { seafoods_emoji } from "../../assets/foodcategories";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

const { width, height } = Dimensions.get("screen");

export const IngredientTag = ({
  title,
  handlePress,
}: {
  title: string;
  handlePress?: () => void;
}) => {
  return (
    <View style={styles.ingerdientTagContainer}>
      <Text style={styles.ingerdientTagText}>{title}</Text>
    </View>
  );
};

const DietPlanCard = ({
  name,
  handlePress,
  tags,
  image,
}: {
  name: string;
  handlePress: () => void;
  tags: string[];
  image: any;
}) => {
  return (
    <Pressable
      style={{
        width: "100%",
        height: 200,
        marginBottom: 20,
        position: "relative",
      }}
      onPress={handlePress}
    >
      <Image style={styles.image} source={image}>
        {/* OVERLAY */}
      </Image>
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <View style={styles.nameAndRatingsContainer}>
          <Text style={styles.dietNameText}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={15} color={Colors.primary} />
            <Ionicons name="star" size={15} color={Colors.primary} />
            <Ionicons name="star" size={15} color={Colors.primary} />
            <Ionicons name="star" size={15} color={Colors.primary} />
            <Ionicons name="star-outline" size={15} color={Colors.primary} />
          </View>
        </View>
        <View style={styles.allIngredientsContainer}>
          {tags?.map((tag, index) => (
            <IngredientTag key={index} title={tag} />
          ))}
        </View>

        {/* BUTTON */}
        <View style={{ zIndex: 10 }}>
          <Pressable onPress={handlePress}>
            <Text style={styles.moreInfotext}>Tap to see more info</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default DietPlanCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    // borderColor: Colors.primary,
    gap: 10,
  },
  container: {
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    borderRadius: 15,
    opacity: 0.4,
    height: 200,
    // zIndex: -10,
  },
  nameAndRatingsContainer: {
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  dietNameText: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
    fontFamily: SEMI_BOLD,
  },
  ratingContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "white",
    width: 100,
    justifyContent: "center",
  },
  allIngredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    zIndex: 10,
  },
  ingerdientTagContainer: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ingerdientTagText: {
    color: "white",
    fontWeight: "600",
  },
  dietImage: {
    width: 200,
    height: 300,
  },
  dietImageContainer: {
    alignItems: "center",
    // borderWidth: 2,
  },
  moreInfotext: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
  },
});
