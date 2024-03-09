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
import UserDetails from "../screens/signupscreen/UserDetails";
import UserPasswordScreen from "../screens/signupscreen/UserPasswordScreen";
type OnboardingRoutesList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  LocationPermission: undefined;
  LocationConfirmation: {
    latitude: number;
    longitude: number;
  };
  DeliveryAddressScreen?: undefined;
  UserDetails: undefined;
  PasswordScreen: {
    firstName: string;
    lastName: string;
  };
};

const Stack = createNativeStackNavigator<OnboardingRoutesList>();

const OnboardingRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="PasswordScreen" component={UserPasswordScreen} />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      <Stack.Screen name="LocationConfirmation" component={LocationScreen} />
      <Stack.Screen name="DeliveryAddressScreen" component={LocationScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
