import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NutritionalValue from "./components/NutritionalValue";

type Props = {};

export const MealBreakDownScreen = ({ navigation, route }: any) => {
  const { _id, name } = route.params ?? {};

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
            uri: "https://cdn.sanity.io/images/xnrrhmkl/production/4c19fd308e5e1da0e68acbde81b9a3cb6e329a3e-900x720.png",
          }}
        />
        <NutritionalValue />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
