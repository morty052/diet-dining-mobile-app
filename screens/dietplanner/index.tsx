import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useMemo } from "react";
import { useQuizStore } from "../../store/quizStore";
import { useNavigation } from "@react-navigation/native";
import { ceaser_salad } from "../../assets/dishes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { seafoods_emoji } from "../../assets/foodcategories";
import { DietBrowser } from "./components/DietBrowser";
import DietTracker from "./components/DietTracker";
import { mockMealData } from "../../constants/restaurants";
import { Ionicons } from "@expo/vector-icons";
import { keto_bg } from "../../assets/diet-plan-images";

type DietStackParamList = {
  DietHome: undefined;
  DietQuiz: undefined;
  DietPlan: undefined;
  DailyDiet: undefined;
  DietBrowser: undefined;
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
  name,
  image,
  _id,
  price,
  description,
}: {
  name: string;
  image: any;
  _id: string;
  price: number;
  description: string;
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        // @ts-ignore
        navigation.navigate("FoodScreen", {
          _id,
          name,
          image,
          price,
          description,
        })
      }
      style={{
        flex: 1,
        marginRight: 16,
        width: Dimensions.get("screen").width * 0.9,
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: "100%", height: 224, borderRadius: 12 }}
          source={{ uri: image }}
          // source={ceaser_salad}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            borderRadius: 12,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0 0 0 / 0.2)",
          }}
        ></View>
      </View>
      <View
        style={{
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: 18, fontFamily: SEMI_BOLD }}>{name}</Text>
          <Text style={{ fontSize: 16 }}>${price}</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 16,
            width: 112,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 4,
            borderRadius: 24,
            borderColor: Colors.dark,
          }}
        >
          <Text style={{ fontSize: 14, fontFamily: SEMI_BOLD }}>Order</Text>
        </View>
      </View>
    </Pressable>
  );
}

const Circle = ({ onPress }: { onPress?: () => void }) => {
  const { width, height } = useWindowDimensions();
  const circleWidth = width * 2;
  const circleHeight = height * 0.6;

  return (
    <View
      style={[
        {
          width: circleWidth,
          height: circleHeight,
          transform: [{ translateX: -width / 2 }],
          position: "absolute",
          top: 0,
        },
      ]}
      className=" bg-primary rounded-bl-full    px-2 "
    >
      {/* <SafeAreaView>
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
      </SafeAreaView> */}
    </View>
  );
};

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<"TODAY" | "TRACKER">>;
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
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        <View
          style={{
            paddingBottom: 30,
            rowGap: 50,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ rowGap: 30, paddingHorizontal: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: SEMI_BOLD,
                  color: Colors.dark,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Find your meal plan
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: SEMI_BOLD,
                  color: Colors.dark,
                  textAlign: "center",
                }}
                className="text-center text-dark font-medium "
              >
                Take a short quiz to get a diet plan tailored to your specific
                needs or browse popular plans on diet dining.
              </Text>
            </View>
            <Image
              source={seafoods_emoji}
              style={{ height: 200, width: 200, alignSelf: "center" }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, width: "100%" }}>
            <Button
              onPress={() => navigation.navigate("QuizRoutes")}
              variant="default"
              title="Start Quiz"
            />
            {/* <Text
              style={{
                color: Colors.link,
                fontFamily: SEMI_BOLD,
                textAlign: "center",
                marginTop: 8,
              }}
              onPress={() => navigation.navigate("DietBrowser")}
            >
              Browse popular plans
            </Text> */}
          </View>
        </View>
      </View>
      {/* <StatusBar backgroundColor="#90c466" style="light" /> */}
    </>
  );
};

const DietmockMealData = ({ today }: { today: string }) => {
  const navigate = useNavigation();
  const DateHeader = () => {
    return (
      <View className="px-2 border-b border-gray-300 py-2.5 w-full space-y-2 ">
        <Text className="text-center text-lg">Keto Diet</Text>
        <Text className="text-center text-2xl text-dark font-medium">
          Day 1 of 7
        </Text>
      </View>
    );
  };

  const ActivePlan = () => {
    return (
      <Pressable
        style={{
          height: 100,
          borderRadius: 10,
          position: "relative",
        }}
        // @ts-ignore
        onPress={() => navigate.navigate("DietBrowser")}
      >
        <Image
          resizeMode="cover"
          source={keto_bg}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
          }}
        />
        {/* TITLE */}
        <Text
          style={{
            zIndex: 10,
            color: "white",
            fontFamily: SEMI_BOLD,
            fontSize: 17,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          KETO
        </Text>

        {/* BUTTON */}
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            zIndex: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text style={{ color: "white" }}>View More</Text>
          <Ionicons color={"white"} name="arrow-forward" />
        </View>
        {/* OVERLAY */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            borderRadius: 10,
            opacity: 0.4,
            height: 100,
          }}
        ></View>
      </Pressable>
    );
  };

  return (
    <>
      <DateHeader />
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          gap: 20,
          paddingBottom: 60,
        }}
      >
        <ActivePlan />
        <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD }}>BreakFast</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {mockMealData.slice(0, 3).map((item, index) => (
            <DishPreviewCard
              price={item.price}
              image={item.image}
              _id={item._id}
              key={index}
              name={item.name}
              description={item.description}
            />
          ))}
        </ScrollView>
        <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD }}>Lunch</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {mockMealData.slice(4, 7).map((item, index) => (
            <DishPreviewCard
              image={item.image}
              price={item.price}
              _id={item._id}
              key={index}
              name={item.name}
              description={item.description}
            />
          ))}
        </ScrollView>
        <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD }}>Dinner</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {mockMealData.slice(8, 11).map((item, index) => (
            <DishPreviewCard
              price={item.price}
              image={item.image}
              _id={item._id}
              key={index}
              name={item.name}
              description={item.description}
            />
          ))}
        </ScrollView>
      </View>
    </>
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

  const tabs = {
    TODAY: <DietmockMealData today={today} />,
    TRACKER: <DietTracker today={today} />,
  };

  return (
    <>
      <SafeAreaView>
        <Tabs activeTab={activeTab} setActiveTab={setactiveTab} />
        <ScrollView>{tabs[activeTab]}</ScrollView>
      </SafeAreaView>
    </>
  );
};

export const DietPlanner = ({ navigation }: any) => {
  const { plan } = useQuizStore();

  if (!plan) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DietHome" component={DietHomePage} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DailyDiet"
          component={DailyDiet}
        />
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Text onPress={() => navigation.navigate("DietHome")}>Back</Text>
            ),
            headerTitle: "",
            headerShadowVisible: false,
          }}
          name="DietBrowser"
          component={DietBrowser}
        />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <Stack.Navigator initialRouteName={!plan ? "DietHome" : "DailyDiet"}>
        <Stack.Screen
          options={{
            headerShown: !plan ? true : false,
            headerLeft: () => (
              <Text onPress={() => navigation.goBack()}>Back</Text>
            ),
            headerTitle: "",
            headerShadowVisible: false,
          }}
          name="DietHome"
          component={DailyDiet}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DailyDiet"
          component={DailyDiet}
        />
        {/* <Stack.Screen
          options={{
            headerLeft: () => (
              <Text onPress={() => navigation.navigate("DietHome")}>Back</Text>
            ),
            headerTitle: "",
            headerShadowVisible: false,
          }}
          name="DietBrowser"
          component={DietBrowser}
        /> */}
      </Stack.Navigator>
    </>
  );
};
