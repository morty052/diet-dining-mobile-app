import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import { autoComplete } from "../features/autoComplete";
import { SEMI_BOLD } from "../../../constants/fontNames";
type Props = {
  setNewCoords: any;
  addy: string;
  setAddy: (addy: string) => void;
};

const AutoCompleteInput = ({ setNewCoords, addy, setAddy }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<
    null | { address: string; placeId: string }[]
  >(null);

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

  async function moveMapWithGeocode(
    placeId: string
  ): Promise<{ lat: number; lng: number } | null> {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyDy7zLF31fjoMtFTrkJP9O32oKdqP6npRs`;
      const res = await fetch(url);
      const data = await res.json();
      const geocode = data.results[0].geometry.location;
      return geocode;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <View
      style={{
        gap: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        zIndex: 90000,
        position: "relative",
      }}
    >
      <View style={styles.inputContainer}>
        <Ionicons size={20} name="search-outline" />
        <TextInput
          value={searchQuery}
          onChangeText={(text) => handleAutoComplete(text)}
          placeholderTextColor={Colors.dark}
          placeholder="Search Place"
          style={{ flex: 1 }}
        />
      </View>
      {suggestions && (
        <View
          style={{
            zIndex: 5000,
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
              //   borderRadius: 20,
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
                    setAddy(item.address);
                    const coords = await moveMapWithGeocode(item.placeId);
                    setNewCoords(coords);
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
  );
};

export default AutoCompleteInput;

const styles = StyleSheet.create({
  inputContainer: {
    // borderWidth: 1,
    // flex: 1,

    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.gray,
  },
});
