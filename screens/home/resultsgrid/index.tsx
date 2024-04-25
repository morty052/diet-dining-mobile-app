import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TstoreProps from "../../../types/Store";
import { StorePreviewCard } from "../../../components/cards";

type Props = {
  resultsCounts: number;
  results: TstoreProps[];
  setResults: React.Dispatch<React.SetStateAction<TstoreProps[] | []>>;
};

export const ResultsGrid = ({ resultsCounts, results, setResults }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>{`${resultsCounts} results`}</Text>
        <Text onPress={() => setResults([])}>Reset</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={results}
        renderItem={({ item }) => <StorePreviewCard fullWidth store={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
