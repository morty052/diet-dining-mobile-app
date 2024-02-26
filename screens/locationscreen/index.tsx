import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const BackButtonheader = () => {
  const navigation = useNavigation();
  return (
    <View className="px-4 pt-12 pb-2 ">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        <View className="border h-8 w-8 rounded-full flex justify-center items-center">
          <FontAwesome size={20} color="black" name="close" />
        </View>
        <View className="flex-1  pb-1">
          <Text className="font-medium text-lg text-center">
            Set up delivery location
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export const LocationScreen = (props: Props) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const mapRef = useRef<MapView>(null);

  async function setCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    mapRef.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  //   useEffect(() => {
  //     (async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     })();
  //   }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const { latitude, longitude } = location?.coords ?? {};

  // if (!latitude || !longitude) {
  //   return (
  //     <View className="flex-1 ">
  //       <BackButtonheader />
  //       <View className="flex-1"></View>
  //       <View className="bg-white w-full rounded-t-3xl h-1/5 pt-4">
  //         <View className="px-4 border-b border-gray-200 pb-2">
  //           <Text className="font-medium text-center">
  //             Set up delivery location
  //           </Text>
  //         </View>
  //         <View className="border-b px-2.5 py-2 border-gray-200">
  //           <Button
  //             textStyle="text-white"
  //             style="bg-green-400 w-full"
  //             title="Use current location"
  //             onPress={() => setCurrentLocation()}
  //           />
  //           {/* <Text className="text-center text-sm text-gray-500">Recommended</Text> */}
  //         </View>
  //         <View className=" border-b px-2 py-2 border-gray-200">
  //           <View className="flex-row items-center space-x-2">
  //             <View className="h-12 w-12 border rounded-full items-center justify-center">
  //               <Feather name="map-pin" size={24} color="black" />
  //             </View>
  //             <Text className="text-lg  font-medium">Add a new address</Text>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <BackButtonheader />
      {/* Map */}
      <View style={{ flex: 0.7 }} className="">
        <MapView
          style={styles.map}
          ref={mapRef}
          // provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 49.246292,
            longitude: -123.116226,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: latitude as number,
            longitude: longitude as number,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: latitude as number,
                longitude: longitude as number,
              }}
              title="Delivery location"
            />
          )}
        </MapView>
      </View>
      {/* BOTTOM SHEET */}
      <View style={{ flex: 0.3 }} className="bg-white flex  rounded-t-3xl pt-4">
        <View className="px-4 border-b border-gray-200 pb-2">
          <Text className="font-medium text-center">
            Set up delivery location
          </Text>
        </View>
        <View className="border-b px-2.5 py-2 border-gray-200">
          <Button
            textStyle="text-white"
            style="bg-green-400 w-full"
            title="Use current location"
            onPress={() => setCurrentLocation()}
          />
          {/* <Text className="text-center text-sm text-gray-500">Recommended</Text> */}
        </View>
        <View className=" border-b px-2 pt-6 pb-2 border-gray-200">
          <View className="flex-row items-center space-x-2">
            <View className="h-12 w-12 border rounded-full items-center justify-center">
              <Feather name="map-pin" size={24} color="black" />
            </View>
            <Text className="text-lg  font-medium">Add a new address</Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
