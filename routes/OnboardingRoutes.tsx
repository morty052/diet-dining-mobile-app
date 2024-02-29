import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SplashScreen,
  OnboardingScreen,
  SignUpScreen,
  LocationPermissionScreen,
  LocationScreen,
} from "../screens";
import StoreInfo from "../screens/restaurantscreen/components/StoreInfo";
type OnboardingRoutesList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  LocationPermission: undefined;
  DeliveryAddressScreen?: undefined;
};

const Stack = createNativeStackNavigator<OnboardingRoutesList>();

const OnboardingRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      {/* <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      /> */}
      <Stack.Screen name="DeliveryAddressScreen" component={LocationScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
