import { ScrollView, View, Text } from "react-native";
import {
  Screen,
  FoodCategoryGrid,
  MenuItemsGrid,
  RestaurantsGrid,
  SearchModal,
  ErrorState,
  Loader,
} from "../../components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { menu, salads as saladsCategory, seaFood } from "../../constants/menu";
import { useCartStore } from "../../store/cartStore";
import {
  desserts_emoji,
  leanmeat_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
} from "../../assets/foodcategories";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useMemo, useState } from "react";
import SortingModal from "../../components/sortingmodal";

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
    name: "Lean meat",
    image: leanmeat_emoji,
  },
  // {
  //   name: "Smoothies",
  //   image: smoothie,
  // },
  {
    name: "Soups",
    image: soups_emoji,
  },
  // {
  //   name: "Specials",
  //   image: special,
  // },
  // {
  //   name: "Parfaits",
  //   image: parfait,
  // },
];

const Stack = createNativeStackNavigator();

const HomeMenu = () => {
  const [loading, setloading] = useState(true);

  const fetchStores = async () => {
    // const res = await fetch("http://localhost:3000/stores/get-all");
    const res = await fetch(
      "https://diet-dining-server.onrender.com/stores/get-all"
    );
    const data = await res.json();
    // setloading(false);
    return data;
  };

  const {
    data: stores,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  const { addToCart, cartItems } = useCartStore();

  // if (isLoading) {
  //   return <Loader />;
  // }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <ScrollView className="relative">
      <Screen style="">
        <View>
          <View>
            <MenuItemsGrid categories={categories} />
            {isLoading ? (
              <Loader />
            ) : (
              <View>
                <RestaurantsGrid stores={stores} title="Top Picks For you" />
                <RestaurantsGrid stores={stores} title="Nearby Stores" />
                <RestaurantsGrid stores={stores} title="New in your Area" />
              </View>
            )}
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
};

export const Home = ({ navigation }: { navigation: any }) => {
  return <HomeMenu />;
};
