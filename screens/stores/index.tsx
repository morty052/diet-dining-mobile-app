import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { Screen } from "../../components";
import { SearchBar } from "../../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import { salads, menu, seaFood } from "../../constants/menu";
import { useCartStore } from "../../store/cartStore";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  desserts_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
} from "../../assets/foodcategories";

const categories = [
  // {
  //   name: "All",
  //   category: "All",
  // },
  {
    name: "Salads",
    image: salads_emoji,
    category: "Salads",
  },
  {
    name: "Sea food",
    category: "SeaFoods",
    image: seafoods_emoji,
  },
  {
    name: "Halal",
    category: "Halal",
    image: salads_emoji,
  },
  {
    name: "Vegitarian",
    category: "Vegitarian",
    image: desserts_emoji,
  },
  // {
  //   name: "Lean meat",
  //   image: leanmeat,
  //   category: "Lean meat",
  // },
  {
    name: "Soups",
    category: "Soups",
    image: soups_emoji,
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
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
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
    <View className="rounded-lg p-4 bg-primary  border border-dark/50">
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

const CategoryCard = ({ name, icon }: { name: string; icon: any }) => {
  return (
    <View className="px-2 pt-6 flex flex-row items-center gap-4">
      <View className="pb-4">
        {/* <Ionicons size={30} name="pizza" /> */}
        <Image resizeMode="contain" className="h-10 w-10" source={icon} />
      </View>
      <View className="flex-1 pb-4   border-b border-black/10">
        <Text className=" font-medium text-[18px]">{name}</Text>
      </View>
    </View>
  );
};

export function Stores({ navigation, route }: any) {
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
    <Screen>
      <SafeAreaView>
        <View className="pb-4  ">
          <View className="border p-2 flex flex-row items-center rounded-xl ">
            <Ionicons name="search" size={24} />
            <TextInput
              autoFocus
              placeholder="Search Diet Dining"
              className="flex-1 ml-4"
            />
          </View>
          {/* <CategorySelectorGrid
            handleSetCategory={(activeCategory) =>
              handleSetCategory(activeCategory)
            }
            activeCategory={activeCategory}
          /> */}
          <View className="pt-4">
            <Text className="text-dark font-semibold text-[24px]">
              Top Categories
            </Text>
            <FlatList
              keyboardDismissMode="on-drag"
              data={categories}
              renderItem={({ item, index }) => (
                <CategoryCard name={item.name} icon={item.image} />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </Screen>
  );
}
