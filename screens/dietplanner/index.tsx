import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Screen } from "../../components";
import circle from "../../assets/circle.png";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useMemo } from "react";
import { useQuizStore } from "../../store/quizStore";
import { salads, seaFood } from "../../constants/menu";
import { useNavigation } from "@react-navigation/native";
import { ceaser_salad, chicken_salad } from "../../assets/dishes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui";

type DietStackParamList = {
  DietHome: undefined;
  DietQuiz: undefined;
  DietPlan: undefined;
  DailyDiet: undefined;
};

const Stack = createNativeStackNavigator<DietStackParamList>();

type Props = {};

const menu = [
  {
    name: "Deserts",
    image: "desserts",
  },
  {
    name: "Lean meat",
    image: "desserts",
  },
  {
    name: "Salads",
    image: "desserts",
  },
  {
    name: "Diet foods",
    image: "desserts",
  },
  {
    name: "Smoothies",
    image: "desserts",
  },
  {
    name: "Soups",
    image: "desserts",
  },
  {
    name: "Specials",
    image: "desserts",
  },
  {
    name: "Parfaits",
    image: "desserts",
  },
];

function DishPreviewCard({
  title,
  image,
  _id,
}: {
  title: string;
  image: any;
  _id: string;
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        // @ts-ignore
        navigation.navigate("FoodScreen", {
          _id: _id,
          title: title,
          image: image,
        })
      }
      className="flex-1  mr-4 w-[90vw]"
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full  h-56 rounded-xl     object-cover"
        />
        <View className="absolute top-2 right-4">
          <Feather name="heart" size={24} color="black" />
        </View>
        <View className="absolute rounded-xl top-0 bottom-0 left-0 right-0 bg-black/20 "></View>
      </View>
      <View className="py-2 flex flex-row items-center justify-between">
        <View className="flex">
          <Text className="text-xl font-medium">{title}</Text>
          <Text className="text-lg">$15.00</Text>
        </View>
        <View className=" border px-4 w-28 inline-flex items-center py-1 rounded-3xl border-dark">
          <Text className="text-sm font-medium">Order</Text>
        </View>
      </View>
    </Pressable>
  );
}

const Circle = ({ onPress }: { onPress: () => void }) => {
  const width = useWindowDimensions().width;
  const circleWidth = width * 2;

  return (
    <View
      style={{
        width: circleWidth,
        transform: [{ translateX: -width / 2 }],
      }}
      className=" bg-primary rounded-bl-full   h-96 px-2 "
    >
      <SafeAreaView>
        <View className="flex items-center w-1/2 mx-auto pt-10 ">
          <View className="py-4">
            <Text className="text-center text-4xl tracking-wide text-light font-semibold">
              Find your meal plan
            </Text>
            <Text className="text-center text-light font-medium text-[17px]">
              Take our quick test to find the perfect diet plan for you.
            </Text>
          </View>
          <View className="w-full px-8">
            <Button onPress={onPress} variant="light" title="Get Started" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (s: string) => void;
}) => {
  return (
    <View className="flex-row justify-between border-y border-gray-300 ">
      <Pressable
        onPress={() => setActiveTab("TODAY")}
        className={` flex-1 inline-flex items-center py-1 rounded ${
          activeTab == "TODAY"
            ? " text-primary border border-gray-300"
            : "text-dark"
        }`}
      >
        <Text
          className={`text-lg font-medium  ${
            activeTab == "TODAY" ? " text-primary" : "text-dark"
          }`}
        >
          Today
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setActiveTab("TRACKER")}
        className={` flex-1 inline-flex items-center py-1 rounded ${
          activeTab == "TRACKER"
            ? " text-primary border border-gray-300"
            : "text-dark"
        }`}
      >
        <Text
          className={`text-lg font-medium  ${
            activeTab == "TRACKER" ? " text-primary" : "text-dark"
          }`}
        >
          Tracker
        </Text>
      </Pressable>
    </View>
  );
};

const DietHomePage = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <View>
        <Circle onPress={() => navigation.navigate("QuizRoutes")} />
        <View className="py-10 space-y-6 px-2">
          <Text className="text-3xl text-dark font-medium">
            Vegetarian Diets
          </Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
                _id=""
                image={
                  "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
                }
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.name}
          />
          <Text className="text-3xl text-dark font-medium">Balanced</Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
                _id=""
                image={
                  "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
                }
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
      {/* <StatusBar backgroundColor="#90c466" style="light" /> */}
    </>
  );
};

const Planner = ({ today }: { today: string }) => {
  const { width, height } = useWindowDimensions();

  const half = height / 2.5;

  const TrackerVisual = () => {
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
        <Text className="text-center text-lg text-white">Hide stats</Text>
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

  const DaySwitcher = () => {
    return (
      <View className=" flex-row items-center pt-12 px-4  w-full">
        <Feather name="chevron-left" size={20} />
        <View className="flex-1 flex-row justify-center  items-center space-x-2">
          <Feather name="calendar" size={20} />
          <Text className="text-lg">{today}</Text>
        </View>
        <Feather name="chevron-right" size={20} />
      </View>
    );
  };

  const RecommendedMealCard = ({
    time,
    image,
  }: {
    time: string;
    image: any;
  }) => {
    return (
      <View className="bg-white my-2 border p-4 flex-row justify-between items-center rounded-lg">
        <Image resizeMode="contain" className=" h-16 w-16" source={image} />
        <View className="flex-1 px-4">
          <Text className="text-xl font-medium test-dark">{time}</Text>
          <Text>recommended: 635-889 kcal</Text>
        </View>
        <Feather name="plus-circle" size={30} />
      </View>
    );
  };

  const RecommendedMealsGrid = () => {
    return (
      <View className="p-4 ">
        <RecommendedMealCard image={ceaser_salad} time="Breakfast" />
        <RecommendedMealCard image={"parfait"} time="Lunch" />
        <RecommendedMealCard image={chicken_salad} time="Dinner" />
      </View>
    );
  };

  return (
    <View className="h-screen">
      <TrackerVisual />
      <DaySwitcher />
      <RecommendedMealsGrid />
    </View>
  );
};

const DailyDiet = ({ navigation }: { navigation: any }) => {
  const [activeTab, setactiveTab] = useState<"TODAY" | "TRACKER">("TODAY");

  const todayRaw = new Date();

  const today = useMemo(() => {
    return todayRaw.toLocaleDateString("en-CA", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }, [todayRaw]);

  const isViewingToday = useMemo(() => {
    if (activeTab == "TODAY") {
      return true;
    }
  }, [activeTab]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {/* @ts-ignore */}
          <Tabs activeTab={activeTab} setActiveTab={setactiveTab} />
          {isViewingToday ? (
            <>
              <View className="px-2 border-b border-gray-300 py-2.5 w-full space-y-2 ">
                <Text className="text-center text-lg">{today}</Text>
                <Text className="text-center text-2xl text-dark font-medium">
                  Day 1 of 7
                </Text>
              </View>
              <View className="pt-10 pb-28 px-2 space-y-2 ">
                <View className="flex-row justify-between items-center py-2 ">
                  <Text className="text-3xl text-dark font-medium">
                    Breakfast
                  </Text>
                  <View className="border-dark bg-primary rounded-3xl px-4 py-2">
                    <Text className="text-xs text-dark font-medium">
                      Pending Order
                    </Text>
                  </View>
                </View>
                <FlatList
                  horizontal
                  data={salads}
                  renderItem={({ item }) => (
                    <DishPreviewCard
                      _id={item._id}
                      image={item.image}
                      title={item.name}
                    />
                  )}
                  keyExtractor={(item) => item.name}
                />
                <Text className="text-3xl text-dark font-medium">Lunch</Text>
                <FlatList
                  horizontal
                  data={seaFood}
                  renderItem={({ item }) => (
                    <DishPreviewCard
                      _id={item._id}
                      image={item.image}
                      title={item.name}
                    />
                  )}
                  keyExtractor={(item) => item.name}
                />
                <Text className="text-3xl text-dark font-medium">Dinner</Text>
                <FlatList
                  horizontal
                  data={salads}
                  renderItem={({ item }) => (
                    <DishPreviewCard
                      _id={item._id}
                      image={item.image}
                      title={item.name}
                    />
                  )}
                  keyExtractor={(item) => item.name}
                />
              </View>
            </>
          ) : (
            <ScrollView>
              <Planner today={today} />
            </ScrollView>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export const DietPlanner = ({ navigation }: any) => {
  const { plan } = useQuizStore();
  return (
    <>
      {!plan ? (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="DietHome"
        >
          <Stack.Screen name="DietHome" component={DietHomePage} />
          <Stack.Screen name="DailyDiet" component={DailyDiet} />
        </Stack.Navigator>
      ) : (
        <DailyDiet navigation={navigation} />
      )}
    </>
  );
};
