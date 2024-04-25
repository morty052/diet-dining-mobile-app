import { ScrollView, View, Text, Image } from "react-native";
import { RestaurantsGrid, ErrorState, Loader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { get_stores, get_stores_around_user } from "../../lib/supabase";
import { MenuItemsGrid } from "./menuitemsgrid";
import { useSearchStore } from "../../store/searchStore";
import { useEffect } from "react";
import { getItem } from "../../utils/storage";
import { baseUrl } from "../../constants/baseUrl";
import React from "react";
import { ResultsGrid } from "./resultsgrid";
import TstoreProps from "../../types/Store";

export const Home = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [results, setResults] = React.useState<TstoreProps[] | []>([]);
  const [fetchingResults, setFetchingResults] = React.useState(false);
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

  useEffect(() => {
    async function getSearchResults(searchQuery: string) {
      setFetchingResults(true);
      const res = await fetch(`${baseUrl}/stores/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery }),
      });
      const data = await res.json();
      setResults(data);
      setFetchingResults(false);
    }
    if (!searchQuery) return;
    getSearchResults(searchQuery);
  }, [searchQuery]);

  if (isError) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ position: "relative", backgroundColor: "white" }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View>
          <MenuItemsGrid query={searchQuery} setQuery={setSearchQuery} />
          {!isLoading &&
            !fetchingResults &&
            stores?.length > 0 &&
            results?.length < 1 && (
              <View style={{ gap: 10 }}>
                <RestaurantsGrid stores={stores} title="Nearby Stores" />
                <RestaurantsGrid stores={stores} title="Top Picks For You" />
                <RestaurantsGrid stores={stores} title="New in your Area" />
              </View>
            )}
          {/* LOADING UI */}
          {fetchingResults && (
            <View className="flex-1 items-center justify-center">
              <Loader />
            </View>
          )}
          {results?.length > 0 && (
            <ResultsGrid
              setResults={setResults}
              resultsCounts={results?.length}
              results={results}
            />
          )}
        </View>
      </View>
      <StatusBar hidden={false} style="dark" />
    </ScrollView>
  );
};
