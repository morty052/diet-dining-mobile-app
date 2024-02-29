import {
  View,
  Pressable,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useMemo } from "react";
import LottieView from "lottie-react-native";
import { healthyFoodLottie, rateFoodLottie, saladLottie } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { save } from "../../lib/secure-store";

type TOnboardingScreenProps = {
  description: string;
  title: string;
  lottie: any;
  color: string;
  width: number;
  height: number;
  textColor?: string;
  activePage: number;
  setActivePage: any;
};

const PageCountCircle = ({
  active,
  setActive,
}: {
  active?: boolean;
  setActive: () => void;
}) => {
  return (
    <Pressable
      onPress={() => setActive()}
      className={`  h-2 w-[30vw] z-10 p-1  mx-1 rounded-full ${
        active ? " bg-white" : "border bg-gray-600 border-white"
      }`}
    ></Pressable>
  );
};

const PageCountVisuals = ({
  activePage,
  setActivePage,
}: {
  activePage: number;
  setActivePage: any;
}) => {
  const onBoardingArray = [1, 2, 3];

  return (
    <View className=" flex-row items-center space-x-4 mt-2">
      {onBoardingArray?.map((item, index) => {
        return (
          <PageCountCircle
            setActive={() => setActivePage(index)}
            active={activePage === index}
            key={index}
          />
        );
      })}
    </View>
  );
};

const OnboardingControls = ({
  handleNext,
  onBoardingArray,
  activePage,
  setActivePage,
}: {
  handleNext: () => void;
  onBoardingArray: string[];
  activePage: number;
  setActivePage: (page: number) => void;
}) => {
  const navigate = useNavigation();

  const isLastItem = useMemo(() => {
    if (activePage === onBoardingArray.length - 1) {
      return true;
    }
    return false;
  }, [activePage]);

  // TODO: MOVE SAVING OF VARIABLE TO SIGN UP
  async function handleFinish() {
    // await save("ONBOARDED", "TRUE");
    console.log("ggg");
    // @ts-ignore
    navigate.navigate("SignUp");
  }

  return (
    <View className="bg-black/30 absolute bottom-0  py-5 px-3 left-0 right-0 ">
      <View className="flex-row justify-between  items-center">
        {/* @ts-ignore */}
        <Pressable onPress={() => handleFinish()}>
          <Text className="text-white font-medium">Skip</Text>
        </Pressable>

        <TouchableOpacity
          className="bg-white px-3 py-3  w-4/5   items-center rounded-full"
          onPress={
            // @ts-ignore
            isLastItem ? () => handleFinish() : () => handleNext()
          }
        >
          <Text className="text-dark text-[16px] font-medium">
            {isLastItem ? "Done" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const OnboardingScreenItem = (props: TOnboardingScreenProps) => {
  const {
    description,
    title,
    lottie,
    color,
    width,
    height,
    textColor,
    activePage,
    setActivePage,
  } = props;

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 900,
  };

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(color, config),
    };
  });

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          {
            display: "flex",
            alignItems: "center",
            position: "relative",
            height: "100%",
          },
          style,
        ]}
      >
        <PageCountVisuals
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <View className=" h-1/2 w-full items-center mt-2  pt-28 px-4 ">
          <LottieView
            resizeMode="cover"
            style={{ width: width * 0.9, height: width }}
            autoPlay
            source={lottie}
          />
        </View>
        <View className=" h-1/2 pb-48 pl-2  flex  justify-end  space-y-2">
          <Animated.Text
            style={{ color: textColor ? textColor : "white" }}
            className="text-3xl font-semibold text-white text-left "
          >
            {title}
          </Animated.Text>
          <Animated.Text
            style={{ color: textColor ? textColor : "white" }}
            className="text-lg font-semibold text-white "
          >
            {description}
          </Animated.Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export const OnboardingScreen = () => {
  const [onboardingIndex, setonboardingIndex] = useState(0);
  const [color, setColor] = useState("#60A5FA");
  const { width, height } = useWindowDimensions();

  const colors = {
    0: "#C084FC",
    1: "#EEE3C8",
    2: "#80A5FA",
  };

  const onboardingPages = {
    0: (
      <OnboardingScreenItem
        setActivePage={setonboardingIndex}
        activePage={onboardingIndex}
        width={width * 0.8}
        height={width}
        lottie={healthyFoodLottie}
        description="Get set up with a  fully tracked diet plan in a few clicks"
        title="Professional Diet Plans"
        color="#C084FC"
      />
    ),
    1: (
      <OnboardingScreenItem
        setActivePage={setonboardingIndex}
        activePage={onboardingIndex}
        width={width}
        height={height}
        lottie={rateFoodLottie}
        description="Get new meal suggestions  based on your previous ratings"
        title="Food Rating system"
        color="#EEE3C8"
        textColor="#1D3557"
      />
    ),
    2: (
      <OnboardingScreenItem
        setActivePage={setonboardingIndex}
        activePage={onboardingIndex}
        width={width}
        height={height}
        lottie={saladLottie}
        description="Get healthy diet meals delivered to your door without the hassle"
        title="Hassle free Diet dining"
        color="#80A5FA"
      />
    ),
  };

  const onBoardingArray = Object.keys(onboardingPages);

  function handleNext() {
    setonboardingIndex(onboardingIndex + 1);
  }

  return (
    <View className="flex-1">
      {onboardingPages[onboardingIndex as keyof typeof onboardingPages]}
      <OnboardingControls
        setActivePage={setonboardingIndex}
        activePage={onboardingIndex}
        onBoardingArray={onBoardingArray}
        handleNext={handleNext}
      />
      {/* <StatusBar
        animated={true}
        backgroundColor={colors[onboardingIndex as keyof typeof colors]}
        style="light"
      /> */}
    </View>
  );
};
