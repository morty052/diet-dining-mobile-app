import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NutritionalValue from "./components/NutritionalValue";

type Props = {};

export const MealBreakDownScreen = ({ navigation, route }: any) => {
  const { _id, name, image } = route.params ?? {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerBackTitleVisible: false,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 50,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          style={{ height: 288, width: "100%" }}
          source={{
            uri: image,
          }}
        />
        <NutritionalValue />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
