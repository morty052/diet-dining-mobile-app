import { Platform, Text } from "react-native";
import { loadAsync, useFonts } from "expo-font";
import { useEffect } from "react";

export const StyledText = ({ children }) => {
  return (
    <Text
      style={{
        fontFamily: Platform.select({
          android: "Inter_600SemiBold",
          ios: "Inter-SemiBold",
        }),
      }}
    >
      {children}
    </Text>
  );
};
