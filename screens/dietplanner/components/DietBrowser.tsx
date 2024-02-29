import { View, Text, FlatList } from "react-native";
import DietPlanCard from "../../../components/cards/DietPlanCard";

const data = Array(10)
  .fill(0)
  .map((item, index) => ({
    _id: index,
  }));

export const DietBrowser = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}>
      <FlatList data={data} renderItem={({ item }) => <DietPlanCard />} />
    </View>
  );
};
