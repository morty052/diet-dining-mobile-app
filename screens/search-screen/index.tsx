import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Pressable,
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
import { useQuery } from "@tanstack/react-query";
import { Ivendor } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";
import Colors from "../../constants/colors";
import LikeButton from "../../components/interaction-buttons/LikeButton";

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

//TODO: HANDLE SEARCH PROPERLY
export const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [searchArray, setSearchArray] = useState<null | Ivendor[]>(null);
  const [products, setProducts] = useState<null | TcartItem[]>(null);

  const fetchStoresAndProducts = async () => {
    // const res = await fetch("http://localhost:3000/stores/search-stores");
    const res = await fetch(
      "https://diet-dining-server.onrender.com/stores/search-stores"
    );
    const data = await res.json();

    const productsRes = await fetch(
      "https://diet-dining-server.onrender.com/stores/search-products"
      // "http://localhost:3000/stores/search-products"
    );

    const productData = await productsRes.json();

    setProducts(productData);

    //
    setSearchArray(data);

    return data;
  };

  const { data: stores, isLoading } = useQuery({
    queryKey: ["searcharray"],
    queryFn: fetchStoresAndProducts,
  });

  const queryResults = useMemo(() => {
    // * RETURN NULL IF FETCHING IS ACTIVE OR USER NOT TYPING OR SEARCH ARRAY IS EMOTY
    if (!searchArray || isLoading || !query) {
      return null;
    }

    // * RETURN NULL IF USER IS TYPING BUT NO STORES MATCH SEARCH QUERY
    if (
      !searchArray.filter((item) =>
        item.store_name.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      return null;
    }

    // * FINNALY RETURN RESULTS OF QUERY IF STORE ARRAY EXISTS AND USER IS TYPING AND THERE ARE RESULTS
    return searchArray.filter((item) =>
      item.store_name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const productsQueryResults = useMemo(() => {
    if (!products || isLoading || !query) {
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
                <Pressable>
                  <Ionicons size={28} name="heart-outline" />
                </Pressable>
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
                <LikeButton background />
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
