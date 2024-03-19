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
    color,
  }: {
    amount: string;
    nutrient: string;
    color: string;
  }) {
    return (
      <View
        style={{
          width: boxWidth,
          backgroundColor: color,
          // borderWidth: 2,
          // borderColor: "rgb(243 244 246)",
          alignItems: "center",
          padding: 8,
          borderRadius: 10,
        }}
      >
        <View className="gap-1">
          <Text
            style={{
              fontSize: 18,
              color: "white",
              textAlign: "center",
              fontFamily: SEMI_BOLD,
            }}
          >
            {amount}
          </Text>
          <Text style={{ textAlign: "center", color: "white" }}>
            {nutrient}
          </Text>
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
        gap: 4,
      }}
    >
      <NutritionBox color="purple" amount="446" nutrient="calories" />
      <NutritionBox color="orange" amount="148" nutrient="fat" />
      <NutritionBox color="steelblue" amount="46" nutrient="saturates" />
      <NutritionBox color="darkgreen" amount="160" nutrient="carbs" />
      <NutritionBox color="silver" amount="10" nutrient="sugars" />
      <NutritionBox color="brown" amount="28" nutrient="fibre" />
      <NutritionBox color="fuchsia" amount="390" nutrient="protein" />
      <NutritionBox color="gold" amount="146" nutrient="kcal" />
      <NutritionBox color="gray" amount="11" nutrient="salt" />
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
