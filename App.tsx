import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes, { AppTabsNavigator } from "./routes/AppRoutes";
import { ClerkProvider } from "@clerk/clerk-expo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { getValueFor } from "./lib/secure-store";
import { Text } from "react-native";
import OnboardingRoutes from "./routes/OnboardingRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CheckoutScreen, FoodScreen, LocationScreen } from "./screens";
import RestaurantScreen from "./screens/restaurantscreen";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export type RootStackParamList = {
  App: undefined;
  OnBoarding: undefined;
  FoodScreen: undefined;
  LocationScreen: undefined;
  Checkout: undefined;
  Restaurant: {
    name: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const client = useMemo(() => new QueryClient(), []);
  const [Onboarded, setOnboarded] = useState(null);
  SplashScreen.preventAutoHideAsync();

  async function checkForKey() {
    const key = await getValueFor("ONBOARDED");

    if (key == "TRUE") {
      await SplashScreen.hideAsync();
      setOnboarded(true);
      console.info(key);
      return;
    } else {
      setOnboarded(false);
      await SplashScreen.hideAsync();
    }
  }
  useEffect(() => {
    checkForKey();
  }, []);

  if (Onboarded == null) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={"pk_test_c3RlYWR5LWNyb3ctNjIuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <QueryClientProvider client={client}>
        <RootSiblingParent>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <AppRoutes ONBOARDED={Onboarded} />
            </NavigationContainer>
          </GestureHandlerRootView>
        </RootSiblingParent>
      </QueryClientProvider>
      <StatusBar hidden={false} style="auto" />
    </ClerkProvider>
  );
}
