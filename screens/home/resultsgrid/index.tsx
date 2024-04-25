import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import TstoreProps from "../../../types/Store";
import { StorePreviewCard } from "../../../components/cards";
import { MEDIUM, SEMI_BOLD } from "../../../constants/fontNames";
import Colors from "../../../constants/colors";

type Props = {
  resultsCounts: number;
  results: TstoreProps[];
  setResults: React.Dispatch<React.SetStateAction<TstoreProps[] | []>>;
};

export const ResultsGrid = ({ resultsCounts, results, setResults }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.resultText}>{`${resultsCounts} results`}</Text>
        <Pressable style={styles.resetButton} onPress={() => setResults([])}>
          <Text style={{ fontSize: 14, fontFamily: MEDIUM }}>Reset</Text>
        </Pressable>
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
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultText: {
    fontFamily: SEMI_BOLD,
    color: Colors.dark,
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 20,
  },
});
