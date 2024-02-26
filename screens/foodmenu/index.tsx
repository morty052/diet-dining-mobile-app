import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { FoodCategoryGrid, FoodItemGrid, Screen } from "../../components";
import { SearchBar } from "../../components";
import { Feather } from "@expo/vector-icons";
import { salads, menu, seaFood } from "../../constants/menu";
import { useCartStore } from "../../store/cartStore";
import { useNavigation } from "@react-navigation/native";
import { desserts, leanmeat, smoothie, soups } from "../../assets";

const categories = [
  {
    name: "All",
    image: desserts,
    category: "All",
  },
  {
    name: "Salads",
    image: "salads",
    category: "Salads",
  },
  {
    name: "Sea food",
    image: smoothie,
    category: "SeaFoods",
  },
  {
    name: "Trending",
    image: soups,
    category: "Soups",
  },
  {
    name: "Desserts",
    image: desserts,
    category: "Desserts",
  },
  // {
  //   name: "Lean meat",
  //   image: leanmeat,
  //   category: "Lean meat",
  // },
  {
    name: "Soups",
    image: soups,
    category: "Soups",
  },
];

const descriptions = {
  Salads: "Experience the healthiest and tastiest salads from diet dining",
  SeaFoods: "Delight your taste buds with our vast Sea food collection.",
  All: "Explore our constantly updating menu of healthy and delicious dishes.",
  Trending:
    "Discover our weekly list of the most popluar dishes from our menu.",
};

const FoodMenuHeader = ({ title }: { title?: string }) => {
  const navigate = useNavigation();

  return (
    <View className="pt-8 pb-6 flex-row justify-between items-center">
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-1 pr-4">
        <Text className="text-center text-2xl font-medium">{"Menu"}</Text>
      </View>
    </View>
  );
};
const CategorySelectItem = ({
  title,
  activeCategory,
  handleSetCategory,
  category,
}: {
  title: string;
  activeCategory: string;
  category: string;
  handleSetCategory: (activeCategory: string) => void;
}) => {
  const isActive = useMemo(
    () => activeCategory === category,
    [activeCategory, title]
  );

  return (
    <TouchableOpacity
      onPress={() => handleSetCategory(category)}
      className={`border-b-4 pb-3   border-b-gray-400 pt-3 px-2 w-[30vw] inline-flex items-center ${
        isActive ? "border-b-primary " : ""
      }`}
    >
      <Text
        className={`text-lg font-medium ${
          isActive ? "text-primary" : "text-dark "
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const CategorySelectorGrid = ({
  activeCategory,
  handleSetCategory,
}: {
  activeCategory: string;
  handleSetCategory: (activeCategory: string) => void;
}) => {
  return (
    <ScrollView horizontal>
      {categories.map((item, index) => (
        <CategorySelectItem
          category={item.category}
          activeCategory={activeCategory}
          handleSetCategory={handleSetCategory}
          key={index}
          title={item.name}
        />
      ))}
    </ScrollView>
  );
};

const CategoryDescriptionCard = ({
  description,
  activeCategory,
}: {
  description: string;
  activeCategory: string;
}) => {
  return (
    <View className="mt-6 rounded-lg p-4 bg-primary  border border-dark/50">
      <View>
        {activeCategory ? (
          <Text className="text-3xl text-white font-medium">
            {activeCategory == "SeaFoods" ? "Sea Foods" : activeCategory}
          </Text>
        ) : (
          <Text className="text-3xl text-white font-medium">All</Text>
        )}
        <Text className=" text-[16px] text-white font-medium">
          {description ? description : descriptions.All}
        </Text>
      </View>
    </View>
  );
};

export function FoodMenu({ navigation, route }: any) {
  const activeCategory = route.params?.activeCategory;

  function handleSetCategory(activeCategory: string) {
    navigation.setParams({
      activeCategory: activeCategory,
    });
  }

  const { addToCart, cartItems } = useCartStore();

  const Allcategories = {
    Salads: salads,
    SeaFoods: seaFood,
    Menu: menu,
    All: salads,
    Trending: salads,
    Desserts: salads,
    Leanmeat: salads,
    Soups: salads,
  };

  // useEffect(() => {
  //   if (!activeCategory) {
  //     navigation.setParams({
  //       activeCategory: "All",
  //     });
  //   }
  // }, [activeCategory]);

  return (
    <SafeAreaView className="px-2 pt-2 pb-80 flex-1 bg-gray-200">
      <FoodMenuHeader title={activeCategory} />
      <View className="pb-4">
        <SearchBar />
        <CategoryDescriptionCard
          activeCategory={activeCategory}
          description={
            descriptions[activeCategory as keyof typeof descriptions]
          }
        />
        <CategorySelectorGrid
          handleSetCategory={(activeCategory) =>
            handleSetCategory(activeCategory)
          }
          activeCategory={activeCategory}
        />
      </View>
      <FoodItemGrid
        cartItems={cartItems}
        title={activeCategory == "SeaFoods" ? "Sea Foods" : activeCategory}
        addToCart={addToCart}
        category={
          !activeCategory
            ? Allcategories.Salads
            : Allcategories[activeCategory as keyof typeof Allcategories]
        }
      />
    </SafeAreaView>
  );
}
