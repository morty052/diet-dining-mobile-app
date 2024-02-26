import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Colors from "../../constants/colors";

const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  handleSelect: (name: string) => void;
  selected: boolean;
  name: string;
};

const CheckBox = ({ handleSelect, selected, name }: Props) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: selected ? Colors.primary : "transparent",
      // transform: [{ scale: selected ? withSpring(1) : withTiming(0.7) }],
      height: selected ? withSpring(30) : withSpring(25),
      width: selected ? withSpring(30) : withSpring(25),
    };
  });

  return (
    <AnimatedOpacity
      style={[animatedStyles, styles.container]}
      onPress={() => {
        handleSelect(name);
        // console.log(name);
      }}
    ></AnimatedOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 2,
  },
});
