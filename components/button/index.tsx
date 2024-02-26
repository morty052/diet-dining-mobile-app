import { Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
  style?: string;
  textStyle?: string;
};

export const Button = ({ title, onPress, style, textStyle }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-40 px-4 py-2 rounded-3xl inline-flex justify-center items-center ${style}`}
    >
      <Text className={`text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};
