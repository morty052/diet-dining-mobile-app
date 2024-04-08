import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Colors from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import {
  keto_bg,
  paleo_bg,
  wholefoods_bg,
} from "../../assets/diet-plan-images";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
  FadeIn,
  FadeInRight,
  SlideInRight,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import { LinearGradient } from "expo-linear-gradient";
import { ProductProps } from "../../types/ProductProps";

type StoryProps = {
  media: "IMAGE" | "TEXT" | "VIDEO";
  type: "FULL_SCREEN" | "HALF_SCREEN";
  image?: string;
  text?: {
    header: string;
    body?: string;
    subtitle?: string;
    options?: {
      headerFontSize?: number;
      headerColor?: string;
      textAlign?: "center" | "left";
    };
  };
  video?: string;
  product?: ProductProps;
};

type MerchantStoryProps = {
  reel: StoryProps[];
  vendor_name: string;
  created_at: string;
};

const storiesArray: StoryProps[] = [
  {
    media: "IMAGE",
    type: "HALF_SCREEN",
    image: paleo_bg,
    text: {
      header: "Try our egg and salmon today!",
      body: "Guaranteed to make your day instantly.",
      subtitle: "order today.",
      options: {
        headerFontSize: 30,
        headerColor: "white",
        textAlign: "center",
      },
    },
    product: {
      name: "Muffin",
      _id: "10",
      image: "dkdk",
      price: 20,
      description: "",
      vendor: {
        store_name: "papa johns",
        store_image: "vsvsv",
      },
    },
  },
  {
    media: "IMAGE",
    type: "FULL_SCREEN",
    image: wholefoods_bg,
    text: {
      header: "Lean meats treats",
      body: "Calling all canivores, try our lean meat treats today.",
      subtitle: "not for the faint hearted",
    },
    product: {
      name: "Muffin",
      _id: "10",
      image: "dkdk",
      price: 20,
      description: "",
      vendor: {
        store_name: "papa johns",
        store_image: "vsvsv",
      },
    },
  },
  {
    media: "IMAGE",
    type: "FULL_SCREEN",
    image: keto_bg,
    text: {
      header: "Lean meats treats",
      body: "Calling all canivores, try our lean meat treats today.",
      subtitle: "not for the faint hearted",
    },
    product: {
      name: "Muffin",
      _id: "10",
      image: "dkdk",
      price: 20,
      description: "",
      vendor: {
        store_name: "papa johns",
        store_image: "vsvsv",
      },
    },
  },
];

const merchantStory: MerchantStoryProps = {
  reel: storiesArray,
  vendor_name: "Papa johns",
  created_at: "5 mins ago",
};

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
  vendor_name,
  created_at,
}: {
  stories: StoryProps[];
  activeStory: StoryProps;
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  vendor_name: string;
  created_at: string;
}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: "absolute",
        top: 8,
        zIndex: 25,
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
          <Text style={{ color: "white" }}>{vendor_name}</Text>
          <Text style={{ color: "white", fontSize: 12 }}>{created_at}</Text>
        </View>
        {/* MENU */}
        <Ionicons
          onPress={() => navigation.goBack()}
          size={24}
          name="close"
          color={"white"}
        />
      </View>
    </View>
  );
}

function StoryOrderButton({ product }: { product: ProductProps }) {
  return (
    <View
      style={{ position: "absolute", bottom: 50, width: "100%", zIndex: 5 }}
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
          onPress={() => console.log(product)}
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
    console.log("clicked");
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
          width: "20%",
          zIndex: 20,
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
          width: "20%",
          zIndex: 20,
        }}
      ></Pressable>
    </>
  );
}

function StoryImageRenderer({ activeStory }: { activeStory: StoryProps }) {
  return (
    <Image
      //  @ts-ignore
      source={activeStory?.image}
      resizeMode="cover"
      style={{
        width: "100%",
        height: 500,
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
        zIndex: 2,
      }}
    />
  );
}

function StoryTextRenderer({
  top,
  bottom,
  text,
  type,
}: {
  top?: boolean;
  bottom?: boolean;
  text?: {
    header: string;
    body?: string;
    subtitle?: string;
    options?: {
      headerFontSize?: number;
      headerColor?: string;
      textAlign?: "center" | "left";
    };
  };
  type?: "FULL_SCREEN" | "HALF_SCREEN";
}) {
  const { header, body, subtitle, options } = text ?? {};
  const { headerFontSize, headerColor, textAlign } = options ?? {};

  console.log(header?.length);

  // * ADJUST HEADER ACCORDING TO TEXT LENGTH
  const isAbove20 = React.useMemo(
    () => (header && header?.length > 20 ? true : false),
    [header?.length]
  );

  if (type == "HALF_SCREEN") {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          gap: 5,
          justifyContent: "flex-end",
          // backgroundColor: "red",
        }}
      >
        {/* Header */}
        {!isAbove20 && (
          <Text
            style={{
              color: "white",
              fontSize: headerFontSize ? headerFontSize : 30,
              fontFamily: SEMI_BOLD,
              textAlign: textAlign ? textAlign : "left",
            }}
          >
            {text?.header}
          </Text>
        )}
        {isAbove20 && (
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontFamily: SEMI_BOLD,
              textAlign: textAlign ? textAlign : "left",
            }}
          >
            {text?.header}
          </Text>
        )}
        {/* Body */}
        {body && (
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: textAlign ? textAlign : "left",
              }}
            >
              {body}
            </Text>
          </View>
        )}
        {/* Subtitle */}
        {subtitle && (
          <Text
            style={{
              color: "white",
              fontSize: 14,
              textAlign: textAlign ? textAlign : "left",
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,

        left: 0,
        right: 0,
        width: "100%",
        // backgroundColor: "red",
        paddingBottom: 170,
        // alignItems: "center",
        zIndex: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          gap: 5,
          justifyContent: "flex-end",
          // backgroundColor: "red",
        }}
      >
        {/* Header */}
        <Text
          style={{
            color: "white",
            fontSize: headerFontSize ? headerFontSize : 30,
            fontFamily: SEMI_BOLD,
            textAlign: textAlign ? textAlign : "left",
          }}
        >
          {text?.header}
        </Text>
        {/* Body */}
        {body && (
          <View>
            <Text style={{ color: "white", fontSize: 16, textAlign: "left" }}>
              {body}
            </Text>
          </View>
        )}
        {/* Subtitle */}
        {subtitle && (
          <Text style={{ color: "white", fontSize: 14 }}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
}

function FullScreenReel({
  stories,
  setStories,
  activeStoryIndex,
  setActiveStoryIndex,
}: {
  stories: StoryProps[];
  setStories: (story: StoryProps[]) => void;
  activeStoryIndex: number;
  setActiveStoryIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <SafeAreaView
      // entering={SlideInRight}
      edges={{
        top: "additive",
        bottom: "off",
      }}
      style={[StyleSheet.absoluteFill, { backgroundColor: "black" }]}
    >
      <View style={{ flex: 1, position: "relative", zIndex: 2 }}>
        <StoryHeader
          created_at={merchantStory.created_at}
          vendor_name={merchantStory.vendor_name}
          setActiveStoryIndex={setActiveStoryIndex}
          activeStory={stories[activeStoryIndex]}
          activeStoryIndex={activeStoryIndex}
          stories={stories}
        />
        <StoryImageRenderer activeStory={stories[activeStoryIndex]} />
        <StoryTextRenderer text={stories[activeStoryIndex].text} bottom />
        <StoryOrderButton
          product={stories[activeStoryIndex].product as ProductProps}
        />
        <StoryControlButtons
          stories={stories}
          setActiveStoryIndex={setActiveStoryIndex}
          activeStoryIndex={activeStoryIndex}
        />
        <StoryOverlay />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function MediumScreenReel({
  stories,
  setStories,
  activeStoryIndex,
  setActiveStoryIndex,
}: {
  stories: StoryProps[];
  setStories: (story: StoryProps[]) => void;
  activeStoryIndex: number;
  setActiveStoryIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <SafeAreaView
      edges={{
        top: "additive",
        bottom: "off",
      }}
      style={[{ backgroundColor: "black", flex: 1 }]}
    >
      <View style={{ flex: 1, position: "relative", zIndex: 2 }}>
        <StoryHeader
          created_at={merchantStory.created_at}
          vendor_name={merchantStory.vendor_name}
          setActiveStoryIndex={setActiveStoryIndex}
          activeStory={stories[activeStoryIndex]}
          activeStoryIndex={activeStoryIndex}
          stories={stories}
        />
        <View
          style={{
            width: "100%",
            height: 500,
            paddingTop: 70,
            position: "relative",
            gap: 30,
            // backgroundColor: "red",
          }}
        >
          <StoryImageRenderer activeStory={stories[activeStoryIndex]} />
          <StoryTextRenderer
            type="HALF_SCREEN"
            text={stories[activeStoryIndex].text}
            bottom
          />
        </View>
        <StoryOrderButton
          product={stories[activeStoryIndex].product as ProductProps}
        />
        <StoryControlButtons
          stories={stories}
          setActiveStoryIndex={setActiveStoryIndex}
          activeStoryIndex={activeStoryIndex}
        />
      </View>

      {/* <StoryOverlay /> */}
    </SafeAreaView>
  );
}

const MerchantReelComponent = ({
  merchantStory,
  startingIndex,
}: {
  merchantStory: MerchantStoryProps;
  startingIndex: number;
}) => {
  const [stories, setStories] = React.useState<StoryProps[]>(
    merchantStory.reel
  );
  const [activeStoryIndex, setActiveStoryIndex] = React.useState(startingIndex);

  const IS_FULL_SCREEN = React.useMemo(() => {
    if (stories[activeStoryIndex].type == "HALF_SCREEN") {
      return false;
    }

    return true;
  }, [activeStoryIndex, stories]);

  return (
    <>
      {!IS_FULL_SCREEN && (
        <MediumScreenReel
          activeStoryIndex={activeStoryIndex}
          setActiveStoryIndex={setActiveStoryIndex}
          stories={stories}
          setStories={setStories}
        />
      )}
      {IS_FULL_SCREEN && (
        <FullScreenReel
          activeStoryIndex={activeStoryIndex}
          setActiveStoryIndex={setActiveStoryIndex}
          stories={stories}
          setStories={setStories}
        />
      )}
    </>
  );
};

export const MerchantStoryScreen = ({ route }: any) => {
  const { startingIndex } = route.params ?? {};
  console.info({ startingStoryAt: startingIndex });
  const [stories, setStories] = React.useState<StoryProps[]>(
    merchantStory.reel
  );
  const [activeStoryIndex, setActiveStoryIndex] = React.useState(startingIndex);
  return (
    <MerchantReelComponent
      startingIndex={startingIndex}
      merchantStory={merchantStory}
    />
  );
};

const styles = StyleSheet.create({});
