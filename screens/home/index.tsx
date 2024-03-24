import { ScrollView, View, Text, Image } from "react-native";
import { RestaurantsGrid, ErrorState, Loader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { get_stores, get_stores_around_user } from "../../lib/supabase";
import { MenuItemsGrid } from "./menuitemsgrid";
import { useSearchStore } from "../../store/searchStore";
import { useEffect } from "react";
import { getItem } from "../../utils/storage";
import { ceaser_salad } from "../../assets/dishes";
import { baseUrl } from "../../constants/baseUrl";

export const Home = ({}) => {
  const fetchStores = async () => {
    const latitude = getItem("latitude");
    const longitude = getItem("longitude");
    const res = await fetch(
      `${baseUrl}/stores/get-stores-around?latitude=${latitude}&longitude=${longitude}`
    );
    const data = await res.json();
    if (!data) {
      return [];
    }
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

  const { fetchStoresAndProducts } = useSearchStore();

  useEffect(() => {
    fetchStoresAndProducts();
  }, []);

  if (isError) {
    return <ErrorState />;
  }

  return (
    <ScrollView style={{ position: "relative", backgroundColor: "white" }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View>
          <MenuItemsGrid />
          {!isLoading && stores && stores?.length > 0 && (
            <View>
              <RestaurantsGrid stores={stores} title="Nearby Stores" />
              <RestaurantsGrid stores={stores} title="Top Picks For You" />
              {/* <View style={{ gap: 20, paddingVertical: 20 }}>
                <Text>Spotlight</Text>
                <View
                  style={{
                    height: 100,
                    borderWidth: 1,
                    width: 100,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ height: "100%", width: "100%" }}
                    source={ceaser_salad}
                  />
                </View>
              </View> */}
              <RestaurantsGrid stores={stores} title="New in your Area" />
            </View>
          )}

          {!isLoading && stores && stores?.length == 0 && (
            <Text>Nothing found in your area</Text>
          )}
          {isLoading && <Loader />}
        </View>
      </View>
      <StatusBar hidden={false} style="dark" />
    </ScrollView>
  );
};
