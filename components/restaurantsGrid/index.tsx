import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StorePreviewCard } from "../cards";
import TstoreProps from "../../types/Store";

export const RestaurantsGrid = ({
  title,
  stores,
}: {
  title: string;
  stores: TstoreProps[];
}) => {
  return (
    <View style={{ gap: 10 }}>
      <Text className="text-xl font-bold text-dark">{title}</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        horizontal
        className=""
      >
        {stores?.map((store, index) => {
          return <StorePreviewCard key={index} store={store} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
