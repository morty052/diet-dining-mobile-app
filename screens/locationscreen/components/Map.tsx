import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Props = {};

const Map = ({
  latitude,
  longitude,
  addy,
  mapRef,
  moveMap,
  markerLocation,
  setMarkerLocation,
}: {
  latitude: number;
  longitude: number;
  addy: string;
  mapRef: React.RefObject<MapView>;
  moveMap: any;
  markerLocation: any;
  setMarkerLocation: any;
}) => {
  return (
    <MapView
      ref={mapRef}
      onPress={(e) => moveMap(e.nativeEvent)}
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
      {latitude && longitude && !markerLocation && (
        <Marker
          coordinate={{
            latitude: latitude as number,
            longitude: longitude as number,
          }}
          title={addy}
        />
      )}
      {markerLocation && <Marker coordinate={markerLocation} title={addy} />}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
