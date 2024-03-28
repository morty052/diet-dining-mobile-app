import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { keto_bg, paleo_bg, wholefoods_bg } from "../assets/diet-plan-images";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { MEDIUM, SEMI_BOLD } from "../constants/fontNames";
import { LinearGradient } from "expo-linear-gradient";

type StoryProps = {
  type: "IMAGE" | "TEXT" | "Video";
  image?: string;
  text?: string;
  video?: string;
};

const storiesArray: StoryProps[] = [
  {
    type: "IMAGE",
    image: paleo_bg,
  },
  {
    type: "IMAGE",
    image: wholefoods_bg,
  },
  {
    type: "IMAGE",
    image: keto_bg,
  },
];

function Indicator({
  index,
  activeStoryIndex,
  setActiveStoryIndex,
  stories,
}: {
  index: number;
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  stories: StoryProps[];
}) {
  const storyDuration = 10 * 1000;
  const progress = useSharedValue(0.1);
  const navigation = useNavigation();

  const increaseProgress = () => {
    progress.value = withTiming(progress.value + 0.1, {
      duration: storyDuration,
    });
  };

  function handleNext() {
    console.log("xlicked");
    if (activeStoryIndex + 1 > 1) {
      console.log("last");
      return;
    }
    setActiveStoryIndex(activeStoryIndex + 1);
  }

  const animatedStyle = useAnimatedStyle(() => {
    if (activeStoryIndex == index) {
      return {
        width: `${progress.value * 100}%`,
      };
    }

    if (activeStoryIndex > index) {
      return {
        width: `100%`,
      };
    }

    return {
      width: `0%`,
    };
  });

  React.useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: storyDuration });
  }, [activeStoryIndex]);

  useAnimatedReaction(
    () => progress.value,
    (currentValue, prevValue) => {
      if (currentValue !== prevValue && currentValue === 1) {
        if (activeStoryIndex !== index) {
          return;
        }
        if (activeStoryIndex + 1 > stories.length - 1) {
          console.log("done");
          return;
        }
        runOnJS(setActiveStoryIndex)(activeStoryIndex + 1);
      }

      // {

      //   if (activeStoryIndex != index) {
      //     return;
      //   }
      //   runOnJS(setActiveStoryIndex)(activeStoryIndex + 1);
      // }
    }
  );

  return (
    <Pressable
      onPress={() => handleNext()}
      style={{
        height: 2,
        flex: 1,
        backgroundColor: "gray",
        borderRadius: 5,
      }}
    >
      <Animated.View
        style={[
          {
            height: 2,
            backgroundColor: "white",
            borderRadius: 5,
          },
          animatedStyle,
        ]}
      ></Animated.View>
    </Pressable>
  );
}

function SlidesIndicatorRow({
  stories,
  activeStory,
  activeStoryIndex,
  setActiveStoryIndex,
}: {
  stories: StoryProps[];
  activeStory: StoryProps;
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <View
      style={{
        paddingTop: Platform.select({ ios: 0, android: 0 }),
        paddingHorizontal: 4,
        flexDirection: "row",
        gap: 5,
      }}
    >
      {stories.map((item, index) => {
        return (
          <Indicator
            stories={stories}
            activeStoryIndex={activeStoryIndex}
            setActiveStoryIndex={setActiveStoryIndex}
            index={index}
            key={index}
          />
        );
      })}
    </View>
  );
}

function StoryHeader({
  stories,
  activeStory,
  activeStoryIndex,
  setActiveStoryIndex,
}: {
  stories: StoryProps[];
  activeStory: StoryProps;
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: "absolute",
        top: 8,
        zIndex: 250,
        width: "100%",
      }}
    >
      {/* SLIDES INDICATOR */}
      <SlidesIndicatorRow
        setActiveStoryIndex={setActiveStoryIndex}
        activeStoryIndex={activeStoryIndex}
        activeStory={activeStory}
        stories={stories}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          padding: 10,
          // paddingTop: 15,
          // paddingBottom: 10,
        }}
      >
        <View>
          <Text style={{ color: "white" }}>Natalie veggies burger spot</Text>
          <Text style={{ color: "white", fontSize: 12 }}>10 mins ago</Text>
        </View>
        {/* MENU */}
        <Ionicons
          onPress={() => navigation.goBack()}
          size={24}
          name="close"
          color={"white"}
        />

        {/* OVERLAY */}
        {/* <View
          style={{
            position: "absolute",
            backgroundColor: "black",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            zIndex: -10,
          }}
        ></View> */}
      </View>
    </View>
  );
}

function StoryInteractionView() {
  return (
    <SafeAreaView
      edges={{
        top: "off",
        bottom: "additive",
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          width: "100%",
          paddingVertical: Platform.select({ ios: 10, android: 20 }),
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Leave a comment"
          placeholderTextColor={"white"}
          style={{
            borderWidth: 1,
            flex: 1,
            paddingHorizontal: 10,
            height: 40,
            borderRadius: 10,
            marginRight: 20,
            borderColor: "white",
          }}
        />
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <Ionicons name="heart-outline" color={"white"} size={28} />
          <Ionicons name="share-outline" color={"white"} size={28} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function StoryInteractionButtons() {
  return (
    <View
      style={{ position: "absolute", bottom: 50, width: "100%", zIndex: 20 }}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: Platform.select({ ios: 10, android: 20 }),
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            height: 50,
            width: 150,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: MEDIUM }}>Order Now</Text>
          <View style={{ paddingTop: 4 }}>
            <Ionicons name="arrow-forward-outline" color={"black"} size={20} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function StoryControlButtons({
  activeStoryIndex,
  setActiveStoryIndex,
  stories,
}: {
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  stories: StoryProps[];
}) {
  const navigation = useNavigation();

  function handlePrev() {
    if (activeStoryIndex === 0) {
      navigation.goBack();
      return;
    }
    setActiveStoryIndex(activeStoryIndex - 1);
  }
  function handleNext() {
    if (activeStoryIndex + 1 > stories.length - 1) {
      console.log("last");
      return;
    }
    setActiveStoryIndex(activeStoryIndex + 1);
  }

  return (
    <>
      <Pressable
        onPress={handlePrev}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          // backgroundColor: "red",
          width: "40%",
          zIndex: 50,
        }}
      ></Pressable>
      <Pressable
        onPress={handleNext}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          // backgroundColor: "red",
          width: "40%",
          zIndex: 50,
        }}
      ></Pressable>
    </>
  );
}

function StoryRenderer({ activeStory }: { activeStory: StoryProps }) {
  return (
    <Image
      //  @ts-ignore
      source={activeStory?.image}
      resizeMode="cover"
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "black",
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        borderRadius: 10,
      }}
    ></Image>
  );
}

function StoryOverlay() {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
      }}
    />
  );
}

function StoryTextRenderer({
  top,
  bottom,
}: {
  top?: boolean;
  bottom?: boolean;
}) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 20,
        left: 0,
        right: 0,
        width: "100%",
        // backgroundColor: "red",
        paddingBottom: 170,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 80,
          paddingHorizontal: 20,
          gap: 5,
          justifyContent: "flex-end",
          // alignItems: "center",
        }}
      >
        {/* Header */}
        <Text style={{ color: "white", fontSize: 30, fontFamily: SEMI_BOLD }}>
          Order our new tomato penne!
        </Text>
        {/* Body */}
        <Text style={{ color: "white", fontSize: 16, textAlign: "left" }}>
          Our new tomato penne pasta is made with locally grown tomatoes, basil
          and fresh parmigiano-reggiano. Try it today!
        </Text>
        {/* Subtitle */}
        <Text style={{ color: "white", fontSize: 14 }}>
          Your Friends will love it
        </Text>
      </View>
    </View>
  );
}

const TestScreen = () => {
  const [stories, setStories] = React.useState<StoryProps[]>(storiesArray);
  const [activeStoryIndex, setActiveStoryIndex] = React.useState(0);
  return (
    <SafeAreaView
      edges={{
        top: "additive",
        bottom: "off",
      }}
      style={[StyleSheet.absoluteFill, { backgroundColor: "black" }]}
    >
      <View style={{ flex: 1, position: "relative" }}>
        <StoryHeader
          setActiveStoryIndex={setActiveStoryIndex}
          activeStory={stories[activeStoryIndex]}
          activeStoryIndex={activeStoryIndex}
          stories={stories}
        />
        <StoryRenderer activeStory={stories[activeStoryIndex]} />
        <StoryTextRenderer bottom />
        <StoryControlButtons
          stories={stories}
          setActiveStoryIndex={setActiveStoryIndex}
          activeStoryIndex={activeStoryIndex}
        />
        <StoryInteractionButtons />
      </View>
      {/* <View
        style={{
          position: "absolute",
          backgroundColor: "black",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          zIndex: 10,
        }}
      ></View> */}
      <StoryOverlay />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
