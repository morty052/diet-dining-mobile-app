import { View, Text, useWindowDimensions } from "react-native";
import LottieView from "lottie-react-native";
import { ghost } from "../../assets";
import { StatusBar } from "expo-status-bar";
import { Screen } from "../screen";

type Props = {
  description: string;
  secondaryText?: string;
};

export const EmptyState = (props: Props) => {
  const { description, secondaryText } = props;
  const { width } = useWindowDimensions();

  return (
    <View className="pt-12  flex ">
      <LottieView
        style={{ height: width * 0.9, width: width * 0.9 }}
        autoPlay
        source={ghost}
      />
      <Text className="text-center text-3xl font-medium text-dark">
        {description}
      </Text>
      {secondaryText && (
        <Text className="text-center text-xl font-medium text-dark">
          {secondaryText}
        </Text>
      )}
    </View>
  );
};
