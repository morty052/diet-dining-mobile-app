import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

export const Screen = ({
  children,
  style,
  safe,
}: {
  children?: React.ReactNode;
  style?: string;
  safe?: boolean;
}) => {
  return (
    <View className={`${style} flex-1`}>
      <View className={`w-full px-2 pt-2  `}>{children}</View>
    </View>
  );
};
