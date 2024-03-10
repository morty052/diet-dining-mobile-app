import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cart,
  Home,
  DietPlanner,
  OrdersPage,
  FoodScreen,
  LocationScreen,
  CheckoutScreen,
  QuizRoutes,
  Stores,
  SearchScreen,
  AccountScreen,
  MealBreakDownScreen,
} from "../screens";
import OnboardingRoutes from "./OnboardingRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../store/cartStore";
import { Image, View, TouchableOpacity } from "react-native";

import { Header } from "../components";
import { StatusBar } from "expo-status-bar";
import RestaurantScreen from "../screens/restaurantscreen";
import TestScreen from "../screens/TestScreen";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";
import StoreInfo from "../screens/restaurantscreen/components/StoreInfo";

type RootTabsParamList = {
  Home: undefined;
  Diet: undefined;
  Cart: undefined;
  Orders: undefined;
  Browse: undefined;
};

const Tab = createBottomTabNavigator<RootTabsParamList>();

export function AppTabsNavigator({ navigation }) {
  const { itemsCount } = useCartStore();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            tabBarActiveTintColor: "green",
            header: () => <Header />,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? Colors.primary : "black"}
              />

              // <Image style={{ width: 30, height: 30 }} source={home_icon} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveTintColor: "green",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search-outline"
                size={24}
                color={focused ? Colors.primary : "black"}
              />
              // <Image style={{ width: 30, height: 30 }} source={foodmenu_icon} />
            ),
            title: "Browse",
          }}
          name="Browse"
          component={SearchScreen}
        />

        <Tab.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "rgb(229 231 235)",
            },
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "bold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  style={{ marginLeft: 10 }}
                  size={28}
                  color="black"
                  name="chevron-back"
                />
              </TouchableOpacity>
            ),
            // tabBarStyle: { display: "none" },
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="cart-outline"
                size={24}
                color={focused ? Colors.primary : "black"}
              />
              // <Image style={{ width: 30, height: 30 }} source={cart_icon} />
            ),
            tabBarBadge: itemsCount > 0 ? itemsCount : undefined,
          }}
          name="Cart"
          component={Cart}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "fast-food" : "fast-food-outline"}
                size={24}
                color={focused ? Colors.primary : "black"}
              />
              // <Image
              //   style={{ width: 30, height: 30 }}
              //   source={dietplanner_icon}
              // />
            ),
            tabBarActiveTintColor: "green",
            // tabBarStyle: {
            //   display: "none",
            // },
          }}
          name="Diet"
          component={DietPlanner}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveTintColor: "green",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="bag-outline"
                size={24}
                color={focused ? Colors.primary : "black"}
              />
              // <Image style={{ width: 25, height: 25 }} source={orders_icon} />
            ),
          }}
          name="Orders"
          component={OrdersPage}
        />
      </Tab.Navigator>
      <StatusBar hidden={false} style="dark" />
    </>
  );
}

export type RootStackParamList = {
  App: undefined;
  OnBoarding: undefined;
  FoodScreen: undefined;
  LocationScreen: undefined;
  Checkout: undefined;
  Search: undefined;
  Restaurant: {
    name: string;
  };
  QuizRoutes: undefined;
  Test: undefined;
  StoreInfo: {
    store_id: string;
    store_name: string;
  };
  MealBreakDown: {
    store_id: string;
    store_name: string;
  };
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = ({ ONBOARDED }: { ONBOARDED: boolean }) => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName={!ONBOARDED ? "OnBoarding" : "App"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="App" component={AppTabsNavigator} />
      <Stack.Screen
        options={{
          animation: "none",
        }}
        name="Search"
        component={SearchScreen}
      />
      <Stack.Screen name="OnBoarding" component={OnboardingRoutes} />
      <Stack.Screen
        options={{
          animation: "slide_from_bottom",
        }}
        name="FoodScreen"
        component={FoodScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Delivery Info",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="LocationScreen"
        component={LocationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitle: "",
          headerTitleAlign: "center",
        }}
        name="Checkout"
        component={CheckoutScreen}
      />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
        name="MealBreakDown"
        component={MealBreakDownScreen}
      />
      <Stack.Screen
        options={{
          // headerTitle: "",
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
        name="Account"
        component={AccountScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerShown: true,
          headerTransparent: true,
        }}
        name="StoreInfo"
        component={StoreInfo}
      />
      <Stack.Screen
        options={{ headerShown: false, headerBackTitleVisible: false }}
        name="QuizRoutes"
        component={QuizRoutes}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}
        name="Test"
        component={TestScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
