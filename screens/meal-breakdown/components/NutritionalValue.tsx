import {
  Modal,
  Pressable,
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../../constants/fontNames";
import Colors from "../../../constants/colors";

const NutritionalGrid = () => {
  const { width } = useWindowDimensions();

  const boxWidth = width * 0.32;

  function NutritionBox({
    amount,
    nutrient,
  }: {
    amount: string;
    nutrient: string;
  }) {
    return (
      <View
        style={{ width: boxWidth }}
        className="border-2 border-primary items-center flex p-2 "
      >
        <View className="gap-1">
          <Text className="text-[18px] font-medium text-dark text-center">
            {amount}
          </Text>
          <Text style={{ textAlign: "center" }}>{nutrient}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <NutritionBox amount="446" nutrient="calories" />
      <NutritionBox amount="148" nutrient="fat" />
      <NutritionBox amount="46" nutrient="saturates" />
      <NutritionBox amount="160" nutrient="carbs" />
      <NutritionBox amount="10" nutrient="sugars" />
      <NutritionBox amount="28" nutrient="fibre" />
      <NutritionBox amount="390" nutrient="protein" />
      <NutritionBox amount="11" nutrient="salt" />
      <NutritionBox amount="146" nutrient="kcal" />
    </View>
  );
};

const NutritionalValue = ({}: {}) => {
  return (
    <View style={{}}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 16,
        }}
      >
        <Text
          style={{ fontFamily: SEMI_BOLD, fontSize: 20, color: Colors.dark }}
        >
          Nutritional Information
        </Text>
      </View>

      <View>
        <NutritionalGrid />
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Text
          style={{ fontFamily: SEMI_BOLD, fontSize: 20, color: Colors.dark }}
        >
          Ingredients
        </Text>
        <View className="py-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Tomatoes</Text>
          <Text className="text-lg font-medium text-dark">40g</Text>
        </View>
        <View className="py-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Lettuce</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
        <View className="py-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Collard Greens</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
        <View className="py-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Olive Oil</Text>
          <Text className="text-lg font-medium text-dark">1tsp</Text>
        </View>
        <View className="py-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Garlic</Text>
          <Text className="text-lg font-medium text-dark">1tsp</Text>
        </View>
      </View>
    </View>
  );
};

export default NutritionalValue;
