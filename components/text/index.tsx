import { Text as RawText } from "react-native";
import { loadAsync, useFonts } from "expo-font";
import { useEffect } from "react";

export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <RawText className={className}>{children}</RawText>;
};
