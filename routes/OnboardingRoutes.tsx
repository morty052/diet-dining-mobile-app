import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen, OnboardingScreen, SignUpScreen } from "../screens";
type OnboardingRoutesList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<OnboardingRoutesList>();

const OnboardingRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
