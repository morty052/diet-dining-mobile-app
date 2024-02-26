import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  desserts_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
} from "../../assets/foodcategories";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IOS } from "../../utils/Platform";

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

  const { width: phoneWidth } = useWindowDimensions();

  const width = phoneWidth * 0.3;

  return (
    <TouchableOpacity
      style={{ width }}
      onPress={() => handleSetCategory(category)}
      className={`border-b-4 pb-2   border-b-gray-400 pt-3 px-2 inline-flex items-center  ${
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

const CategorySelectorGrid = ({
  activeCategory,
  handleSetCategory,
}: {
  activeCategory: string;
  handleSetCategory: (activeCategory: string) => void;
}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="max-h-14 "
      horizontal
    >
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

export const SearchModal = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View className=" flex-1 pt-14 px-2  ">
      {/* SEARCHBAR */}
      <View className=" rounded-2xl flex flex-row items-center border border-gray-300 bg-gray-300/40 py-2   px-4 ">
        <TouchableOpacity
          onPress={() => {
            setFocused(false);
          }}
        >
          <Ionicons
            name={!focused ? "search" : "arrow-back"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          ref={inputRef}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          value={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="Food, drinks, etc..."
          className=" bg-transparent flex-1   placeholder:text-left text-[18px]   border-gray-300 mx-2  "
        />
        {query && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name={"close"} size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/*  */}
      <CategorySelectorGrid
        handleSetCategory={() => ""}
        activeCategory="Salads"
      />
      {/* CATEGORIES */}
      <View className="pt-8">
        {/* <View className="pb-4">
              <Text className="font-medium text-dark/80 text-[20px]">Recent</Text>
              <CategoryCard name="Salad" />
            </View> */}
        <Text className="font-medium text-dark text-[20px]">
          Top Categories
        </Text>
        {categories.map((category) => (
          <CategoryCard
            icon={category.image}
            name={category.name}
            key={category.name}
          />
        ))}
      </View>

      {/* SEARCH RESULTS */}
    </View>
  );
};

type Props = {};

export const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const queryResults = useMemo(() => {
    if (!query) {
      return [];
    }

    return categories.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <SafeAreaView className="flex-1">
      <View
        style={{
          paddingTop: IOS ? 0 : 20,
        }}
        className="px-2 flex-1"
      >
        {/* SEARCHBAR */}
        <View className=" rounded-2xl flex flex-row items-center border border-gray-300 bg-gray-300/40 py-2   px-4 ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name={"arrow-back"} size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            autoFocus
            autoCapitalize="none"
            value={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="Food, drinks, etc..."
            className=" bg-transparent flex-1   placeholder:text-left text-[18px]   border-gray-300 mx-2  "
          />
          {query && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name={"close"} size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView className=" flex-1 px-2  ">
          {/*  */}

          {/* CATEGORIES */}
          {!query && (
            <View className="pt-8">
              <Text className="font-medium text-dark text-[20px]">
                Top Categories
              </Text>
              {categories.map((category) => (
                <CategoryCard
                  icon={category.image}
                  name={category.name}
                  key={category.name}
                />
              ))}
            </View>
          )}

          {/* SEARCH RESULTS */}
          {queryResults?.map((item) => (
            <Text key={item.name}>{item.name}</Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
