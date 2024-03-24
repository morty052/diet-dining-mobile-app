import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

type Props = {
  onPress?: () => void;
  title: string;
  variant: "default" | "light" | "dark" | "primary";
  loading?: boolean;
};

const Button = ({ onPress, title, variant, loading }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={variants[variant as keyof typeof variants].container}
    >
      {!loading && (
        <Text className={variants[variant as keyof typeof variants].buttonText}>
          {title}
        </Text>
      )}
      {loading && <ActivityIndicator size="large" color="white" />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  container: "bg-dark w-full py-4 flex-row flex justify-center rounded-lg",
  buttonText: "text-light text-[20px] font-medium",
};

const variants = {
  default: {
    container: "bg-dark w-full py-4 flex-row flex justify-center rounded-lg",
    buttonText: "text-light text-center text-[20px] font-medium",
  },
  primary: {
    container: "bg-primary w-full py-4 flex-row flex justify-center rounded-lg",
    buttonText: "text-light text-center text-[20px] font-medium",
  },
  light: {
    container:
      "bg-white w-full py-4 px-2 flex-row flex justify-center items-center rounded-lg",
    buttonText: "text-dark text-center text-[20px] font-medium",
  },
};
