import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SplashScreen,
  OnboardingScreen,
  SignUpScreen,
  LocationPermissionScreen,
  LocationScreen,
  AddressFinderScreen,
} from "../screens";
import StoreInfo from "../screens/restaurantscreen/components/StoreInfo";
import UserDetails from "../screens/signupscreen/UserDetails";
import UserPasswordScreen from "../screens/signupscreen/UserPasswordScreen";
import LoginScreen from "../screens/login-screen";
import UserEmail from "../screens/signupscreen/UserEmail";
type OnboardingRoutesList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  Login: undefined;
  LocationPermission: undefined;
  LocationConfirmation: {
    latitude: number;
    longitude: number;
  };
  DeliveryAddressScreen?: undefined;
  UserDetails: undefined;
  UserEmail: undefined;
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="UserEmail" component={UserEmail} />
      <Stack.Screen name="PasswordScreen" component={UserPasswordScreen} />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Delivery Info",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {},
        }}
        name="LocationConfirmation"
        component={LocationScreen}
      />
      <Stack.Screen
        name="DeliveryAddressScreen"
        component={AddressFinderScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
