import React from "react";
import { Dimensions } from "react-native";

export function usePhoneScreen() {
  const isTallScreen = React.useMemo(() => {
    const height = Dimensions.get("screen").height;
    if (height < 700) {
      return false;
    }
    return true;
  }, []);

  return {
    isTallScreen,
  };
}
