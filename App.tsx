import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes, { AppTabsNavigator } from "./routes/AppRoutes";
import { ClerkProvider } from "@clerk/clerk-expo";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationComponent from "./components/NotificationComponent";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { getItem, setItem } from "./utils/storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas.projectId,
    });
    const { data } = token;

    console.log(data);
    setItem("expo_push_token", `${data}`);
  }

  return token?.data;
}

export default function App() {
  const client = useMemo(() => new QueryClient(), []);
  const [Onboarded, setOnboarded] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function checkForKey() {
    const key = getItem("ONBOARDED");

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
      <StatusBar hidden={false} style="dark" />
    </ClerkProvider>
    // <NotificationComponent />
  );
}
