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
import { getValueFor } from "../../lib/secure-store";
import { useNavigation } from "@react-navigation/native";
import Map from "./components/Map";
import { reverseGeocodeAddress } from "./features/reverseGeocodeAddress";
import AutoCompleteInput from "./components/AutoCompleteInput";
import { useLocationStore } from "../../store/locationStore";
import { getItem, setItem } from "../../utils/storage";

type Props = {};

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get("screen");

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

const AddressFinderScreen = ({ navigation }: any) => {
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

    setItem("latitude", `${coords.latitude}`);
    setItem("longitude", `${coords.longitude}`);

    await reverseGeocodeAddress({
      latitude: `${coords.latitude}`,
      longitude: `${coords.longitude}`,
    });

    navigation.navigate("MainLocationScreen");
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

export const LocationScreen = ({ navigation }: any) => {
  const [coords, setCoords] = React.useState<{
    latitude: string | boolean;
    longitude: string | boolean;
  } | null>(null);

  const [addy, setAddy] = React.useState<null | string>(null);

  const [newCoords, setNewCoords] = React.useState();

  const [loading, setLoading] = React.useState(false);

  const [markerLocation, setMarkerLocation] = React.useState<null | {
    latitude: number;
    longitude: number;
  }>();

  const { setHeader } = useLocationStore();

  const mapRef = React.useRef<MapView>(null);

  const moveMapToInput = (e: any) => {
    const { lat, lng } = e;

    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    setMarkerLocation(region);
    mapRef.current?.animateToRegion(region);
  };

  React.useEffect(() => {
    if (newCoords) {
      return;
    }
    const getCoords = async () => {
      const latitude = getItem("latitude");
      const longitude = getItem("longitude");

      const address = getItem("DELIVERY_ADDRESS");

      // const addy = await reverseGeocodeAddress({
      //   latitude: latitude as string,
      //   longitude: longitude as string,
      // });

      if (address) {
        setAddy(address as string);
      } else {
        const addy = await reverseGeocodeAddress({
          latitude: latitude as string,
          longitude: longitude as string,
        });
        setAddy(addy);
      }

      setCoords({
        latitude: `${latitude}`,
        longitude: `${longitude}`,
      });
    };

    getCoords();
  }, []);

  React.useEffect(() => {
    if (!newCoords) {
      return;
    }

    moveMapToInput(newCoords);
  }, [newCoords]);

  async function handleConfirmLocation() {
    setLoading(true);
    setItem("DELIVERY_ADDRESS", addy as string);
    setItem("ONBOARDED", "TRUE");
    setHeader();
    setLoading(false);
    navigation.navigate("App");
  }

  const moveMap = async (e: any) => {
    const { latitude, longitude } = e.coordinate;

    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    const addy = await reverseGeocodeAddress({
      latitude,
      longitude,
    });

    setAddy(addy);
    // setNewCoords({ latitude, longitude });
    setMarkerLocation(region);
    // mapRef.current?.animateToRegion(region);
  };

  if (!coords) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AutoCompleteInput
        addy={addy as string}
        setAddy={setAddy}
        setNewCoords={setNewCoords}
      />
      <View style={styles.mapContainer}>
        <Map
          markerLocation={markerLocation}
          setMarkerLocation={setMarkerLocation}
          // @ts-ignore
          moveMap={(e) => moveMap(e)}
          mapRef={mapRef}
          addy={addy as string}
          latitude={Number(coords.latitude)}
          longitude={Number(coords.longitude)}
        />
      </View>

      <View style={styles.addressContainer}>
        <View>
          {/* <Text style={styles.deliveryText}>{addy}</Text> */}
          <Text style={styles.subtitle}>{addy}</Text>
        </View>

        <SafeAreaView
          edges={{
            top: "off",
            bottom: "additive",
          }}
        >
          <Button
            onPress={() => handleConfirmLocation()}
            variant="default"
            title={!loading ? "Select Address" : "Confirming..."}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  mapContainer: {
    backgroundColor: "rgb(134 239 172)",
    height: height * 0.6,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addressContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "center",
    gap: 40,
    flex: 1,
    paddingBottom: Platform.select({
      android: 20,
      ios: 0,
    }),
    // backgroundColor: "red",
  },
  deliveryText: {
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 10,
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
