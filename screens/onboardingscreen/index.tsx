import {
  View,
  Pressable,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState, useMemo } from "react";
import LottieView from "lottie-react-native";
import { healthyFoodLottie, rateFoodLottie, saladLottie } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";

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
      style={[
        styles.pageCountItemStyle,
        active
          ? {
              backgroundColor: "white",
            }
          : {
              backgroundColor: "rgb(75 85 99)",
              borderColor: "white",
            },
      ]}
      onPress={() => setActive()}
      // className={`  h-2 w-[30vw] z-10 p-1  mx-1 rounded-full ${
      //   active ? " bg-white" : "border bg-gray-600 border-white"
      // }`}
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
  // * CREATE MOCK LIST OF  3 ITEMS TO MAP THROUGH
  const onBoardingArray = [1, 2, 3];

  return (
    <View style={styles.pageCountContainer}>
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

  async function handleFinish() {
    // @ts-ignore
    navigate.navigate("SignUp");
  }

  return (
    <View style={styles.onboardingControlsContainer}>
      <View style={styles.onboardingControlsInnerContainer}>
        <Pressable onPress={() => handleFinish()}>
          <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>Skip</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.nextButtonContainer}
          onPress={isLastItem ? () => handleFinish() : () => handleNext()}
        >
          <Text style={styles.nextButtonText}>
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

  const config = {
    duration: 900,
  };

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(color, config),
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <SafeAreaView style={styles.container}>
        <PageCountVisuals
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <View
          style={styles.lottieContainer}
          // className=" h-1/2 w-full items-center mt-2  pt-28 px-4 "
        >
          <LottieView
            resizeMode="cover"
            style={{ width: width * 0.9, height: width }}
            autoPlay
            source={lottie}
          />
        </View>
        <View
          style={styles.bottomContainer}
          // className=" h-1/2 pb-48 pl-2  flex  justify-end border  space-y-2"
        >
          <Animated.Text
            style={[
              { color: textColor ? textColor : "white" },
              styles.titleText,
            ]}
            // className="text-3xl font-semibold text-white text-left "
          >
            {title}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.subtitle,
              { color: textColor ? textColor : "white" },
            ]}
            // className="text-lg font-semibold text-white "
          >
            {description}
          </Animated.Text>
        </View>
      </SafeAreaView>
    </Animated.View>
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
    <View style={{ flex: 1, position: "relative" }}>
      {onboardingPages[onboardingIndex as keyof typeof onboardingPages]}
      <OnboardingControls
        setActivePage={setonboardingIndex}
        activePage={onboardingIndex}
        onBoardingArray={onBoardingArray}
        handleNext={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
    flex: 1,
  },
  pageCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  pageCountItemStyle: {
    height: 8,
    width: Dimensions.get("screen").width * 0.3,
    zIndex: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    padding: 1,
  },
  lottieContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 16,
  },
  bottomContainer: {
    height: "50%",
    paddingLeft: 8,
    // justifyContent: "center",
    gap: 2,
    paddingTop: 60,
    // borderWidth: 1,
  },
  titleText: { fontSize: 30, fontFamily: SEMI_BOLD, textAlign: "left" },
  subtitle: { fontSize: 16, fontFamily: SEMI_BOLD },
  onboardingControlsContainer: {
    position: "absolute",
    backgroundColor: "rgba(0 0 0 / 0.3)",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    // paddingVertical: 20,
    height: 80,
    justifyContent: "center",
  },
  onboardingControlsInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {},
  nextButtonContainer: {
    backgroundColor: "white",
    padding: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 20,
  },
  nextButtonText: { color: Colors.dark, fontSize: 16, fontFamily: SEMI_BOLD },
});
