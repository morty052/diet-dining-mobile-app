import {
  Pressable,
  TextInput,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import Colors from "../../constants/colors";
import {
  GeocodeAddress,
  reverseGeocodeAddress,
} from "../locationscreen/features/reverseGeocodeAddress";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { autoComplete } from "../locationscreen/features/autoComplete";
import { SEMI_BOLD } from "../../constants/fontNames";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../../utils/storage";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: Colors.gray,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      <Ionicons size={30} name="arrow-back" />
    </Pressable>
  );
};

const NextButton = ({
  handlePress,
  loading,
}: {
  handlePress: () => void;
  loading: boolean;
}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: 100,
        alignItems: "center",
      }}
    >
      {!loading && (
        <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
          Next
        </Text>
      )}
      {loading && <ActivityIndicator color={"white"} size={20} />}
    </Pressable>
  );
};

export const AddressFinderScreen = ({ navigation }: any) => {
  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<
    null | { address: string; placeId: string }[]
  >(null);
  const [loading, setloading] = React.useState(false);

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

    const delivery_address = await reverseGeocodeAddress({
      latitude: `${coords.latitude}`,
      longitude: `${coords.longitude}`,
    });

    // navigation.navigate("LocationConfirmation");

    navigation.navigate("LocationConfirmation", {
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
      delivery_address,
    });
    // mapRef.current?.animateToRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  }

  async function handleAutoComplete(text: string) {
    setSearchQuery(text);
    if (text.length <= 0) {
      setSuggestions(null);
    }
    if (text.length > 4) {
      const data = await autoComplete(text);
      setSuggestions(data);
    }
  }

  async function handleNext() {
    if (loading) {
      return;
    }
    setloading(true);
    setItem("DELIVERY_ADDRESS", searchQuery);

    const data = await GeocodeAddress({
      address: searchQuery,
    });
    const { latitude, longitude } = data ?? {};
    setItem("latitude", `${latitude}`);
    setItem("longitude", `${longitude}`);
    setloading(false);
    navigation.navigate("LocationConfirmation", {});
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            rowGap: 25,
            paddingTop: 30,

            backgroundColor: "white",
          }}
        >
          <View>
            <Text
              style={{ color: Colors.dark, fontWeight: "700", fontSize: 30 }}
            >
              Find food Near you
            </Text>
            <Text
              style={{ color: Colors.dark, fontWeight: "500", fontSize: 16 }}
            >
              We need to know your address in order to find healthy food for
              you.
            </Text>
          </View>
          <View style={{ position: "relative", zIndex: 300 }}>
            <TextInput
              onChangeText={(text) => handleAutoComplete(text)}
              value={searchQuery}
              placeholder="Find address"
              style={{
                width: "100%",
                backgroundColor: "rgb(243 244 246 )",
                padding: 10,
                borderRadius: 10,
                height: 40,
              }}
            />
            {suggestions && (
              <View
                style={{
                  position: "absolute",
                  top: 44,
                  left: 0,
                  right: 0,
                  // paddingHorizontal: 10,
                }}
              >
                <ScrollView
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    borderColor: Colors.gray,
                    //   shadowColor: Colors.gray,
                  }}
                >
                  {suggestions &&
                    suggestions.map((item, index) => (
                      <Text
                        onPress={async () => {
                          setSearchQuery(item.address);
                          setSuggestions(null);
                        }}
                        style={{
                          marginVertical: 4,
                          color: "gray",
                          fontFamily: SEMI_BOLD,
                        }}
                        key={index}
                      >
                        {item.address}
                      </Text>
                    ))}
                </ScrollView>
              </View>
            )}
          </View>
          <Text style={{ color: Colors.dark, fontWeight: "500", fontSize: 16 }}>
            Nearby
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Ionicons color={Colors.dark} size={24} name="location-outline" />
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: Colors.dark, fontWeight: "600", fontSize: 16 }}
              >
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
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <BackButton />
            <NextButton loading={loading} handlePress={handleNext} />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};
