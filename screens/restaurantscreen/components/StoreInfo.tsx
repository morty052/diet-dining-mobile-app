import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";

type Props = {};

const tags = ["Juice", "Burgers", "Halal", "Keto", "Rice", "Soups"];

const { width, height } = Dimensions.get("screen");

const StoreMap = () => {
  return (
    <MapView
      style={styles.map}
      //   ref={mapRef}
      // provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 49.246292,
        longitude: -123.116226,
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
      {/* {location && (
            <Marker
              coordinate={{
                latitude: latitude as number,
                longitude: longitude as number,
              }}
              title="Delivery location"
            />
          )} */}
    </MapView>
  );
};

const StoreTags = () => {
  return (
    <View style={styles.storeTagsContainer}>
      {tags.map((tag, index) => (
        <Text style={{ color: Colors.gray }} key={tag}>
          {`${tag}`}
          {index + 1 < tags.length && " -"}
        </Text>
      ))}
    </View>
  );
};

const StoreInfo = ({ route }) => {
  const { store_name } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <StoreMap />
      </View>
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeNameText}>{store_name}</Text>
        <StoreTags />
        <View className="flex flex-row ">
          <View className="items-center flex flex-row ">
            <Ionicons color={"gold"} size={16} name="star" />
            <Text className=" font-medium"> 4.7 (252 ratings)</Text>
          </View>
        </View>
      </View>

      {/* LOCATION */}
      <View style={styles.infoContainer}>
        <Ionicons name="location-outline" size={20} color="#1F2937" />
        <View style={styles.infoInnerContainer}>
          <View>
            <Text className=" text-[14px] font-medium text-dark">Address</Text>
            <Text className=" font-medium text-dark">200 West 74th st</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>
    </View>
  );
};

export default StoreInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    backgroundColor: "rgb(134 239 172)",
    height: height * 0.35,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  storeInfoContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  storeNameText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  storeTagsContainer: {
    flexDirection: "row",
    columnGap: 4,
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
