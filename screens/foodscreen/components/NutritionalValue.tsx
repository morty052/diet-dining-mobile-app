import {
  Modal,
  Pressable,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NutritionalGrid = () => {
  const { width } = useWindowDimensions();

  const boxWidth = width * 0.3;

  function NutritionBox({}) {
    return (
      <View
        style={{ width: boxWidth }}
        className="border-2 border-primary items-center flex p-2 "
      >
        <View className="gap-1">
          <Text className="text-[18px] font-medium text-dark text-center">
            126g
          </Text>
          <Text>Calorie</Text>
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
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
    </View>
  );
};

const NutritionalValue = ({
  viewingNutritionalValue,
  setNutritionalValue,
  name,
}: {
  name: string;
  viewingNutritionalValue: boolean;
  setNutritionalValue: any;
}) => {
  const BackButtonheader = () => {
    return (
      <SafeAreaView className="px-4 border-b  border-gray-200 ">
        <Pressable
          className=" flex flex-row justify-between items-center"
          onPress={() => setNutritionalValue(false)}
        >
          <View className="border h-8 w-8 rounded-full flex justify-center items-center">
            <Ionicons size={20} color="black" name="close" />
          </View>
          <View className=" flex-1">
            <Text className="text-lg text-right font-medium ">{name}</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  };
  return (
    <Modal
      style={{ backgroundColor: "red" }}
      statusBarTranslucent={false}
      animationType="slide"
      visible={viewingNutritionalValue}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
        <View className="p-4 border-b border-gray-200">
          <Text
            onPress={() => setNutritionalValue(false)}
            className="text-lg font-medium text-dark"
          >
            Nutritional Information
          </Text>
        </View>

        <View>
          <NutritionalGrid />
        </View>
        {/* <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Kcal /100 g</Text>
              <Text className="text-lg font-medium text-dark">483.33 kcal</Text>
            </View>
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">
                Protein /100 g
              </Text>
              <Text className="text-lg font-medium text-dark">9.29 g</Text>
            </View>
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Carbs /100 g</Text>
              <Text className="text-lg font-medium text-dark">9.29 g</Text>
            </View>
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Fat /100 g</Text>
              <Text className="text-lg font-medium text-dark">9.29 g</Text>
            </View>
  
            <View className="px-4 py-6 border-b border-gray-200">
              <Text className="text-lg font-medium text-dark">
                Additional Information
              </Text>
            </View>
  
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Sugar</Text>
              <Text className="text-lg font-medium text-dark">483.33 g</Text>
            </View>
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Lettuce</Text>
              <Text className="text-lg font-medium text-dark">9.29 g</Text>
            </View>
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Mandarin Oil</Text>
              <Text className="text-lg font-medium text-dark">9.29 g</Text>
            </View>
            <View className="p-4 border-b border-gray-200 flex-row justify-between">
              <Text className="text-lg font-medium text-dark">Black Pepper</Text>
              <Text className="text-lg font-medium text-dark">9.29 g</Text>
            </View> */}
      </SafeAreaView>
    </Modal>
  );
};

export default NutritionalValue;
