import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Pressable,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  desserts_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
} from "../../assets/foodcategories";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IOS } from "../../utils/Platform";
import { useQuery } from "@tanstack/react-query";
import { Ivendor } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";
import Colors from "../../constants/colors";
import LikeButton from "../../components/interaction-buttons/LikeButton";
import { SEMI_BOLD } from "../../constants/fontNames";
import { useSearchStore } from "../../store/searchStore";

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
    name: "Soups",
    category: "Soups",
    image: salads_emoji,
  },
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
    name: "Chinese",
    category: "Chinese",
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

const CategoryCard = ({
  name,
  icon,
  navigation,
}: {
  name: string;
  icon: any;
  navigation: any;
}) => {
  const width = Dimensions.get("screen").width;
  const cardWidth = width * 0.45;
  return (
    <Pressable
      onPress={() =>
        navigation.setParams({
          category: name,
        })
      }
      style={{
        width: cardWidth,
        borderWidth: 1,
        height: cardWidth,
        borderRadius: 10,
        borderColor: Colors.primary,
      }}
    >
      <Image
        resizeMode="contain"
        style={{
          width: cardWidth * 0.7,
          height: cardWidth * 0.7,
          alignSelf: "center",
        }}
        source={icon}
      />
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          padding: 5,
        }}
      >
        <Text style={{ fontFamily: SEMI_BOLD, fontSize: 15 }}>{name}</Text>
      </View>
    </Pressable>
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

type TsearchItem = {
  price: number;
  name: string;
  _id: string;
  quantity: number;
  category: string;
  total?: number;
  image?: ImageSourcePropType;
  description: string;
  vendor: {
    store_name: string;
    store_image: string;
  };
};

//TODO: HANDLE SEARCH PROPERLY
export const SearchScreen = ({ navigation, route }: any) => {
  const { category } = route.params ?? {};

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [searchArray, setSearchArray] = useState<null | Ivendor[]>(null);
  // const [products, setProducts] = useState<null | TsearchItem[]>(null);
  const [activeCategory, setactiveCategory] = useState<null | string>(category);

  const { products, stores } = useSearchStore();
  console.log(products);

  const queryResults = useMemo(() => {
    // * RETURN NULL IF FETCHING IS ACTIVE OR USER NOT TYPING OR SEARCH ARRAY IS EMPTY
    if (!query) {
      return null;
    }

    // * RETURN NULL IF USER IS TYPING BUT NO STORES MATCH SEARCH QUERY
    if (
      !stores.filter((item) =>
        item?.store_name?.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      return null;
    }

    // * FINNALY RETURN RESULTS OF QUERY IF STORE ARRAY EXISTS AND USER IS TYPING AND THERE ARE RESULTS
    return stores.filter((item) =>
      item?.store_name?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const productsQueryResults = useMemo(() => {
    if (!query) {
      return null;
    }

    if (
      !products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      return null;
    }

    return products?.filter((item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const categoryQueryResults = useMemo(() => {
    if (!category) {
      return null;
    }

    return products?.filter((item) =>
      item?.category?.toLowerCase().includes(category?.toLowerCase())
    );
  }, [category]);

  return (
    <SafeAreaView className="flex-1">
      <View
        style={{
          paddingTop: IOS ? 20 : 20,
        }}
        className="px-2 flex-1"
      >
        {/* SEARCHBAR */}
        <View className=" rounded-2xl flex flex-row items-center border border-gray-300 bg-white py-2   px-4 ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name={"arrow-back"} size={20} color="black" />
          </TouchableOpacity>
          <TextInput
            autoFocus
            autoCapitalize="none"
            value={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="Food, drinks, etc..."
            className=" bg-transparent flex-1   placeholder:text-left text-[16px]   border-gray-300 mx-2  "
          />
          {query && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name={"close"} size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView keyboardDismissMode="on-drag" className="  px-2  ">
          {/*  */}

          {/* CATEGORIES */}
          {!query && !categoryQueryResults && (
            <View style={{ paddingTop: 32 }}>
              <Text
                style={{
                  fontFamily: SEMI_BOLD,
                  color: Colors.dark,
                  fontSize: 20,
                }}
              >
                Top Categories
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  rowGap: 20,
                  paddingTop: 10,
                }}
              >
                {categories.map((category) => (
                  <CategoryCard
                    navigation={navigation}
                    icon={category.image}
                    name={category.name}
                    key={category.name}
                  />
                ))}
              </View>
            </View>
          )}

          {/* STORE SEARCH RESULTS */}
          <View style={{ rowGap: 14, paddingTop: 40 }}>
            {queryResults && queryResults.length > 0 && (
              <Text
                style={{ fontWeight: "800", color: Colors.dark, fontSize: 28 }}
              >
                Vendors
              </Text>
            )}
            {queryResults?.map((item) => (
              <Pressable
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate("Restaurant", {
                    store_name: item.store_name,
                    store_id: item._id,
                    store_image: item.store_image,
                  })
                }
                style={{
                  flexDirection: "row",
                  columnGap: 6,
                  alignItems: "center",
                }}
                key={item.store_name}
              >
                <Image
                  resizeMode="cover"
                  style={{ height: 60, width: 60, borderRadius: 50 }}
                  source={{ uri: item.store_image }}
                />
                {/* ITEM NAME AND OPENING */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600" }}
                    className="font-medium"
                  >
                    {item.store_name}
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600" }}
                    className="font-medium"
                  >
                    Available at 8:00 AM
                  </Text>
                </View>

                {/* LIKE BUTTON */}
                <LikeButton item_id={item._id} background />
              </Pressable>
            ))}
          </View>
          {/* PRODUCTS SEARCH RESULTS */}
          <View style={{ rowGap: 14, marginTop: 20 }}>
            {productsQueryResults && productsQueryResults.length > 0 && (
              <Text
                style={{ fontWeight: "800", color: Colors.dark, fontSize: 28 }}
              >
                Meals
              </Text>
            )}
            {productsQueryResults?.map((item) => (
              <Pressable
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate("FoodScreen", {
                    _id: item._id,
                    image: item.image,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                  })
                }
                style={{
                  flexDirection: "row",
                  columnGap: 6,
                  alignItems: "center",
                }}
                key={item.name}
              >
                <Image
                  resizeMode="cover"
                  style={{ height: 60, width: 60, borderRadius: 50 }}
                  // @ts-ignore
                  source={{ uri: item.image }}
                />
                {/* ITEM NAME AND OPENING */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600" }}
                    className="font-medium"
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600" }}
                    className="font-medium"
                  >
                    {item.store_name}
                  </Text>
                </View>

                {/* LIKE BUTTON */}
                <LikeButton item_id={item._id} background />
              </Pressable>
            ))}
          </View>

          {/* CATEGORY SEARCH RESULTS */}
          <View style={{ rowGap: 14 }}>
            {categoryQueryResults &&
              categoryQueryResults.length > 0 &&
              !productsQueryResults && (
                <Text
                  style={{
                    fontWeight: "800",
                    color: Colors.dark,
                    fontSize: 28,
                  }}
                >
                  {category}
                </Text>
              )}
            {categoryQueryResults &&
              categoryQueryResults.length > 0 &&
              !productsQueryResults &&
              categoryQueryResults?.map((item) => (
                <Pressable
                  onPress={() =>
                    // @ts-ignore
                    navigation.navigate("FoodScreen", {
                      _id: item._id,
                      image: item.image,
                      name: item.name,
                      price: item.price,
                      description: item.description,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    columnGap: 6,
                    alignItems: "center",
                  }}
                  key={item.name}
                >
                  <Image
                    resizeMode="cover"
                    style={{ height: 60, width: 60, borderRadius: 50 }}
                    // @ts-ignore
                    source={{ uri: item.image }}
                  />
                  {/* ITEM NAME AND OPENING */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontSize: 16, fontWeight: "600" }}
                      className="font-medium"
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: "600" }}
                      className="font-medium"
                    >
                      {item.store_name}
                    </Text>
                  </View>

                  {/* LIKE BUTTON */}
                  <LikeButton item_id={item._id} background />
                </Pressable>
              ))}
          </View>

          {/* NO RESULTS */}
          {/* FIX ME */}
          <View style={{ rowGap: 14 }}>
            {query &&
              queryResults &&
              productsQueryResults &&
              productsQueryResults?.length < 1 &&
              queryResults?.length < 1 && (
                <Text
                  style={{
                    fontWeight: "800",
                    color: Colors.dark,
                    fontSize: 28,
                  }}
                >
                  No Results
                </Text>
              )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
