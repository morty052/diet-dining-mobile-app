import { View, Text, Image, useWindowDimensions } from "react-native";
import { ceaser_salad } from "../../../assets/dishes";
import { Ionicons } from "@expo/vector-icons";

const TrackerVisual = () => {
  const { width, height } = useWindowDimensions();

  const half = height / 2.5;
  return (
    <View style={{ height: half }} className="bg-dark relative">
      <View className="flex flex-row justify-center items-center space-x-8 py-6">
        <View className="flex items-center">
          <Text className="text-lg font-bold text-white">0</Text>
          <Text className="text-lg font-bold text-white">Eaten</Text>
        </View>
        <View className=" w-52 h-52 rounded-full border-[8px] flex items-center justify-center border-gray-300/10">
          <Text className="text-5xl text-white font-bold">2540</Text>
          <Text className="text-white">KCAL LEFT</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-lg font-bold text-white">0</Text>
          <Text className="text-lg font-bold text-white">Goal</Text>
        </View>
      </View>
      {/* <Text className="text-center text-lg text-white">Hide stats</Text> */}
      <View className="absolute -bottom-8 left-0 z-10 right-0 px-6">
        <View className="bg-white rounded-lg p-4  flex-row justify-between w-full">
          <View className="flex items-center space-y-2">
            <Text className="">Carbs</Text>
            <Text>0/318g</Text>
          </View>
          <View className="flex items-center space-y-2">
            <Text className="">Protein</Text>
            <Text>0/127g</Text>
          </View>
          <View className="flex items-center space-y-2">
            <Text className="">Fat</Text>
            <Text>0/85g</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const DaySwitcher = ({ today }: { today: string }) => {
  return (
    <View className=" flex-row items-center pt-12 px-4  w-full">
      <Ionicons name="chevron-back" size={20} />
      <View className="flex-1 flex-row justify-center  items-center space-x-2">
        <Ionicons name="calendar-outline" size={20} />
        <Text className="text-lg">{today}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} />
    </View>
  );
};

const RecommendedMealCard = ({ time, image }: { time: string; image: any }) => {
  return (
    <View className="bg-white my-2 border p-4 flex-row justify-between items-center rounded-lg">
      <Image resizeMode="contain" className=" h-16 w-16" source={image} />
      <View className="flex-1 px-4">
        <Text className="text-xl font-medium test-dark">{time}</Text>
        <Text>recommended: 635-889 kcal</Text>
      </View>
      <Ionicons name="add-circle-outline" size={30} />
    </View>
  );
};

const RecommendedMealsGrid = () => {
  return (
    <View className="p-4 ">
      <RecommendedMealCard image={ceaser_salad} time="Breakfast" />
      <RecommendedMealCard image={ceaser_salad} time="Lunch" />
      <RecommendedMealCard image={ceaser_salad} time="Dinner" />
    </View>
  );
};

const DietTracker = ({ today }: { today: string }) => {
  return (
    <View className="h-screen">
      <TrackerVisual />
      <DaySwitcher today={today} />
      <RecommendedMealsGrid />
    </View>
  );
};

export default DietTracker;
