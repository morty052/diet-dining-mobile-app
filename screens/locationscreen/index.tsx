import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { Button } from "../../components/ui";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getValueFor, save } from "../../lib/secure-store";
import { StyledText } from "../../components/ui/styled-text";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get("screen");

async function reverseGeocodeAddress({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDy7zLF31fjoMtFTrkJP9O32oKdqP6npRs`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results[0].formatted_address);
}

const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <MapView
      style={styles.map}
      //   ref={mapRef}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        // latitude: 49.246292,
        // longitude: -123.116226,
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      //   region={{
      //     latitude: latitude as number,
      //     longitude: longitude as number,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   }}
    >
      {latitude && longitude && (
        <Marker
          coordinate={{
            latitude: latitude as number,
            longitude: longitude as number,
          }}
          title="Delivery location"
        />
      )}
    </MapView>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="bg-white h-8 w-8 rounded-full flex justify-center items-center"
      onPress={() => navigation.goBack()}
    >
      <Ionicons size={20} name="arrow-back" />
    </Pressable>
  );
};

const ManualAddressFinderScreen = ({ navigation }: any) => {
  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  async function setCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const { coords } = location;

    await save("latitude", `${coords.latitude}`);
    await save("longitude", `${coords.longitude}`);

    await reverseGeocodeAddress({
      latitude: `${coords.latitude}`,
      longitude: `${coords.longitude}`,
    });

    navigation.navigate("MainLocationScreen");
    // mapRef.current?.animateToRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  }

  return (
    <View
      style={{
        paddingHorizontal: 10,
        rowGap: 25,
        paddingTop: 30,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View>
        <Text style={{ color: Colors.dark, fontWeight: "700", fontSize: 30 }}>
          Find food Near you
        </Text>
        <Text style={{ color: Colors.dark, fontWeight: "500", fontSize: 16 }}>
          We need to know your address in order to find healthy food for you.
        </Text>
      </View>
      <TextInput
        placeholder="Enter a new address"
        style={{ width: "100%", backgroundColor: Colors.gray, padding: 10 }}
      />
      <Text style={{ color: Colors.dark, fontWeight: "500", fontSize: 16 }}>
        Nearby
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}
      >
        <Ionicons color={Colors.gray} size={24} name="location-outline" />
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.gray, fontWeight: "600", fontSize: 16 }}>
            Current Location
          </Text>
          <Text>Location access is off</Text>
        </View>
        <Pressable
          onPress={setCurrentLocation}
          style={{
            backgroundColor: Colors.gray,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
          }}
        >
          <Text>Turn On</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MainLocationScreen = ({ navigation }: any) => {
  const [coords, setCoords] = React.useState<{
    latitude: string | boolean;
    longitude: string | boolean;
  } | null>(null);

  React.useEffect(() => {
    const getCoords = async () => {
      const latitude = await getValueFor("latitude");
      const longitude = await getValueFor("longitude");

      setCoords({
        latitude,
        longitude,
      });
    };

    getCoords();
  }, []);

  if (!coords) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map
          latitude={Number(coords.latitude)}
          longitude={Number(coords.longitude)}
        />
      </View>
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeNameText}>Confirm delivery address</Text>
        <Text style={styles.subtitle}>
          Move the pin to highlight the correct door or entrance to help drivers
          deliver orders faster.
        </Text>
      </View>
      <SafeAreaView
        edges={{
          top: "off",
          bottom: "additive",
        }}
        style={{
          paddingHorizontal: 10,
          // paddingBottom: 40,
          // backgroundColor: "blue",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ paddingBottom: 30 }}>
          <Button
            onPress={() => navigation.navigate("App")}
            variant="default"
            title="Confirm Location"
          />
        </View>
      </SafeAreaView>
    </View>
    // <>

    // </>
  );
};

export const LocationScreen = ({ route, navigation }: any) => {
  const { latitude, longitude } = route.params ?? {};

  const [coords, setCoords] = React.useState<{
    latitude: string | boolean;
    longitude: string | boolean;
  } | null>(null);

  React.useEffect(() => {
    const getCoords = async () => {
      const latitude = await getValueFor("latitude");
      const longitude = await getValueFor("longitude");

      console.log(latitude, longitude);

      setCoords({
        latitude,
        longitude,
      });
    };

    getCoords();
  }, []);

  if (!coords) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={"MainLocationScreen"}>
      {/* <Stack.Screen
        options={{
          headerBackVisible: true,
          headerShadowVisible: false,
          title: "Delivery Location",
          headerLeft: () => (
            <Text onPress={() => navigation.goBack()}>Back</Text>
          ),
        }}
        name="ManualAddressFinder"
        component={ManualAddressFinderScreen}
      /> */}
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => <BackButton />,
        }}
        name="MainLocationScreen"
        component={MainLocationScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    backgroundColor: "rgb(134 239 172)",
    height: height * 0.7,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  storeInfoContainer: {
    paddingHorizontal: 10,
    paddingTop: 30,
    // backgroundColor: "red",
  },
  storeNameText: {
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 5,
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 18,
  },
  storeTagsContainer: {
    flexDirection: "row",
    columnGap: 4,
    paddingVertical: 4,
  },
  infoContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  infoInnerContainer: {
    // className:"flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: Colors.gray,
    paddingBottom: 16,
    marginLeft: 6,
  },
});
