import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getValueFor, save } from "../../lib/secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { Button } from "../../components/ui";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";

type Props = {};

export const LocationPermissionScreen = ({ navigation }: any) => {
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
    console.log(location);
    // mapRef.current?.animateToRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  }

  const handleNext = async () => {
    console.log(location);
    await save("ONBOARDED", "TRUE");
    navigation.navigate("DeliveryAddressScreen", {
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
    });
  };

  React.useEffect(() => {
    const getKey = async () => {
      const _id = await getValueFor("user_id");
      console.log(_id);
    };

    getKey();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons size={200} name="location" color={Colors.primary} />
      </View>
      <View style={{ rowGap: 20, paddingBottom: 60 }}>
        <Text style={styles.accessText}>Allow location access</Text>
        <Text style={styles.subtitle}>
          This lets us show you which restaurants and vendors you can order from
        </Text>
      </View>
      <View style={{ rowGap: 20, paddingBottom: 50 }}>
        <Button onPress={setCurrentLocation} variant="default" title="Allow" />
        <Button onPress={() => handleNext()} variant="default" title="Allow" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  accessText: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.dark,
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 20,
  },
});
