import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SortingModal from "../sortingmodal";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  desserts_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
} from "../../assets/foodcategories";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
type Props = {};

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
  // {
  //   name: "Trending",
  //   category: "Soups",
  //   image: salads_emoji,
  // },
  {
    name: "Desserts",
    category: "Desserts",
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

  return (
    <TouchableOpacity
      onPress={() => handleSetCategory(category)}
      className={`border-b-4 pb-2   border-b-gray-400 pt-3 px-2 w-24 inline-flex  ${
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
        <Image resizeMode="contain" className="h-16 w-16" source={icon} />
      </View>
      <View className="flex-1 pb-4   border-b border-black/40">
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

export const SearchModal = () =>
  //   {
  //   focused,
  //   setFocused,
  // }: {
  //   focused: boolean;
  //   setFocused: (searching: boolean) => void;
  // }
  {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // useEffect(() => {
    //   inputRef.current?.focus();
    // }, [focused]);

    return (
      <Modal animationType="slide" visible={focused}>
        {/* <View className="flex justify-end bg-black/40 ">
      </View> */}
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
      </Modal>
    );
  };

export const SearchBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigation();

  const inputRef = useRef<TextInput>(null);

  return (
    <View className=" pb-4 flex flex-row items-center">
      <Pressable className=" rounded-2xl flex flex-1 flex-row items-center border border-gray-300 bg-white py-2   px-4 ">
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigate.navigate("Search")}>
          <Ionicons name={"search"} size={20} color={Colors.dark} />
        </TouchableOpacity>

        <Pressable
          onPress={() => {
            // @ts-ignore
            navigate.navigate("Search");
          }}
          className=" bg-transparent flex-1   placeholder:text-left text-[18px]  border-r border-gray-300 mx-2  "
        >
          <Text>Search Diet Dining</Text>
        </Pressable>
        {/* <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Ionicons name={"options-outline"} size={24} color="black" />
        </TouchableOpacity> */}
      </Pressable>
      <SortingModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </View>
  );
};
