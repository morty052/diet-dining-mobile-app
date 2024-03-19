import { ScrollView, View, Text } from "react-native";
import { RestaurantsGrid, ErrorState, Loader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { get_stores, get_stores_around_user } from "../../lib/supabase";
import { getValueFor } from "../../lib/secure-store";
import { MenuItemsGrid } from "./menuitemsgrid";
import { useSearchStore } from "../../store/searchStore";
import { useEffect } from "react";

export const Home = ({}) => {
  // const fetchStores = async () => {
  //   // const data = await get_stores();
  //   const latitude = await getValueFor("latitude");
  //   const longitude = await getValueFor("longitude");
  //   // const res = await fetch(
  //   //   `http://localhost:3000/stores/get-stores-around?latitude=${latitude}&longitude=${longitude}`
  //   // );
  //   const res = await fetch(
  //     `https://diet-dining-server.onrender.com/stores/get-stores-around?latitude=${latitude}&longitude=${longitude}`
  //   );
  //   const data = await res.json();
  //   return data;
  // };
  const fetchStores = async () => {
    const latitude = await getValueFor("latitude");
    const longitude = await getValueFor("longitude");
    const data = await get_stores_around_user({
      latitude: latitude as string,
      longitude: longitude as string,
    });
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
