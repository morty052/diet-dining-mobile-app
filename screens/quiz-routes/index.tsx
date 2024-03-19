import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import sandwich from "../../assets/lottie/sandwichlottie.json";
import { useQuizStore } from "../../store/quizStore";
import CheckBox from "../../components/checkbox";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import DietPlanCard from "../../components/cards/DietPlanCard";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View className="">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        <Ionicons size={20} color="black" name="chevron-back" />
      </Pressable>
    </View>
  );
};

const preferenceAnswers = [
  {
    title: "I don't have any specific preferences",
    name: "NONE",
  },
  {
    title: "I am pescatarian ",
    subtitle: "(I'm vegetarian but i eat fish)",
    name: "PESCATARIAN",
  },
  {
    title: "I am vegetarian",
    name: "VEGETARIAN",
  },
  {
    title: "I am vegan",
    name: "VEGAN",
  },
];

const allergyAnswers = [
  {
    title: "I don't have any food allergies",
    name: "NONE",
  },
  {
    title: "I am allergic to nuts",
    name: "NUTS",
  },
  {
    title: "I am lactose intolerant",
    name: "LACTOSE",
  },
  {
    title: "I am vegetarian",
    name: "VEGETARIAN",
  },
  {
    title: "Other",
    name: "OTHER",
  },
];

const budgetAnswers = [
  {
    title: "$0 - $25",
    name: "NONE",
  },
  {
    title: "$25 - 50",
    name: "NUTS",
  },
  {
    title: "$50 - $100",
    name: "LACTOSE",
  },
  {
    title: "$100  and above",
    name: "VEGETARIAN",
  },
  {
    title: "Prefer not to say",
    name: "NOT",
  },
];

const QuestionItem = ({
  title,
  border,
  selected,
  name,
  handleSelect,
  handleRemove,
  subtitle,
}: {
  title: string;
  border?: boolean;
  selected: boolean;
  name: string;
  handleSelect: (name: string) => void;
  handleRemove: (name: string) => void;
  subtitle?: string;
}) => {
  return (
    <View
      className={`flex text-dark  flex-row items-center px-4 py-6 space-x-6  ${
        border && "border-b border-gray-400"
      }`}
    >
      <View className="flex-1 pr-4">
        <Text className="  text-dark text-lg">{title}</Text>
        <Text className="   text-lg">{subtitle}</Text>
      </View>
      <CheckBox
        handleRemove={handleRemove}
        selected={selected}
        name={name}
        handleSelect={handleSelect}
      />
    </View>
  );
};

const QuestionGrid = ({
  questions,
  selected,
  setSelected,
  handleRemove,
}: {
  questions: { name: string; title: string; subtitle?: string }[];
  selected: string;
  setSelected: (name: string) => void;
  handleRemove: (name: string) => void;
}) => {
  const [preferences, setPreferences] = useState("");

  function handleSelect(name: string) {
    setSelected(name);
  }

  return (
    <View className="border border-gray-400 rounded-lg py-2 ">
      {questions?.map((pref, index) => (
        // @ts-ignore
        <View key={index}>
          <QuestionItem
            handleRemove={() => handleRemove(pref.name)}
            name={pref.name}
            subtitle={pref.subtitle}
            selected={selected == pref.name}
            title={pref.title}
            handleSelect={(name) => handleSelect(name)}
            border={index + 1 != questions.length}
          />
        </View>
      ))}
    </View>
  );
};

const NextButton = ({
  navigation,
  screen,
  answer,
  handleSelect,
}: {
  navigation: any;
  screen: string;
  answer: string;
  handleSelect: (selection: string) => void;
}) => {
  const [error, setError] = useState(false);

  const handleUserSelection = (answer: string) => {
    if (!answer) {
      setError(true);
      return;
    }
    handleSelect(answer);
    navigation.navigate(screen);
  };

  useMemo(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <SafeAreaView
        edges={{
          top: "off",
          bottom: "additive",
        }}
        className=""
      >
        {/* {error && (
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            className="flex flex-row w-full max-w-md mb-6 rounded-3xl px-6 py-2 border border-red-400  items-center justify-between"
          >
            <Ionicons color={"red"} size={25} name="alert" />
            <Text className="text-[18px]  text-center flex-1 text-red-500 font-medium ">
              Please Select at least one option
            </Text>
          </Animated.View>
        )} */}
        <TouchableOpacity
          style={{ backgroundColor: answer ? Colors.primary : Colors.gray }}
          onPress={() => handleUserSelection(answer)}
          className="flex w-full max-w-md rounded-lg px-6 py-4   items-center justify-center"
        >
          <Text className="text-lg font-medium">Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

function Preferences({ navigation }: { navigation: any }) {
  const [selected, setSelected] = useState("");

  const { setMealPreference } = useQuizStore();

  return (
    <View className="flex-1 flex justify-between bg-white px-4">
      <View style={{ rowGap: 20, paddingTop: 20 }}>
        <Text
          style={{
            textAlign: "center",
            color: Colors.dark,
            fontSize: 20,
            fontFamily: SEMI_BOLD,
          }}
        >
          What best describes your meal preferences?
        </Text>
        <QuestionGrid
          handleRemove={() => setSelected("")}
          selected={selected}
          setSelected={setSelected}
          questions={preferenceAnswers}
        />
      </View>
      <View style={{ paddingBottom: 10 }}>
        <NextButton
          handleSelect={(answer) =>
            setMealPreference(
              answer as "NONE" | "PESCATARIAN" | "VEGAN" | "VEGETARIAN"
            )
          }
          answer={selected}
          screen="Allergies"
          navigation={navigation}
        />
      </View>
    </View>
  );
}

const Allergies = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  const { setAllergy } = useQuizStore();
  return (
    <View className="flex-1 flex justify-between bg-white px-4">
      <View style={{ rowGap: 20, paddingTop: 20 }}>
        <Text
          style={{
            textAlign: "center",
            color: Colors.dark,
            fontSize: 20,
            fontFamily: SEMI_BOLD,
          }}
        >
          Do you have any food allergies?
        </Text>
        <QuestionGrid
          handleRemove={() => setSelected("")}
          selected={selected}
          setSelected={setSelected}
          questions={allergyAnswers}
        />
      </View>
      <View style={{ paddingBottom: 10 }}>
        <NextButton
          handleSelect={(answer) => setAllergy(answer)}
          answer={selected}
          screen="DietBudget"
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const GettingPlanReadyScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);

  return (
    <SafeAreaView className="pt-8 bg-white flex-1">
      <LottieView
        source={sandwich}
        autoPlay
        loop
        style={{ width: 300, height: 300, alignSelf: "center" }}
      />
      <View className="px-2 space-y-2">
        <Text
          style={{
            fontFamily: SEMI_BOLD,
            textAlign: "center",
            fontSize: 36,
            color: Colors.dark,
          }}
        >
          Getting plan ready
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: Colors.dark,
            fontSize: 15,
            fontFamily: SEMI_BOLD,
          }}
        >
          Give us a second to make sure we get the perfect diet plan for you.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const DietBudget = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  const [gettingDietPlan, setGettingDietPlan] = useState(false);

  const { setPlan, answers, dietObject } = useQuizStore();

  const handleDietPlan = () => {
    setGettingDietPlan(true);
    // navigation.navigate("DietConfirmationScreen");
  };

  useEffect(() => {
    if (!gettingDietPlan) {
      return;
    }
    // const timer = setTimeout(() => {
    //   setPlan("plan");
    //   setGettingDietPlan(false);
    //   navigation.navigate("Diet");
    // }, 8000);

    // return () => {
    //   clearTimeout(timer);
    // };
  }, [gettingDietPlan]);

  // const NextButton = ({
  //   navigation,
  //   screen,
  // }: {
  //   navigation: any;
  //   screen: string;
  // }) => {
  //   return (
  //     <SafeAreaView
  //       edges={{
  //         top: "off",
  //         bottom: "additive",
  //       }}
  //       className="flex flex-row justify-center   "
  //     >
  //       <TouchableOpacity
  //         onPress={handleDietPlan}
  //         className="flex w-full max-w-md rounded-lg px-6 py-4 bg-primary items-center justify-center"
  //       >
  //         <Text className="text-2xl font-semibold text-white">Next</Text>
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // };

  return (
    <>
      <View className="flex flex-1 justify-between bg-white px-4">
        <View style={{ rowGap: 20, paddingTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.dark,
              fontSize: 20,
              fontFamily: SEMI_BOLD,
            }}
          >
            How much would you like to spend on your daily diet?
          </Text>
          <QuestionGrid
            handleRemove={() => setSelected("")}
            selected={selected}
            setSelected={setSelected}
            questions={budgetAnswers}
          />
        </View>
        <View style={{ paddingBottom: 10 }}>
          <NextButton
            answer={selected}
            handleSelect={handleDietPlan}
            screen="DietConfirmationScreen"
            navigation={navigation}
          />
        </View>
      </View>
    </>
  );
};

const DietConfirmationScreen = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  const [gettingDietPlan, setGettingDietPlan] = useState(true);

  const { setPlan, answers, dietObject } = useQuizStore();

  const handleDietPlan = () => {
    // setGettingDietPlan(true);
    console.log(dietObject);
  };

  useEffect(() => {
    if (!gettingDietPlan) {
      return;
    }
    const timer = setTimeout(() => {
      setGettingDietPlan(false);
      setPlan("plan");
      navigation.navigate("Diet");
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, [gettingDietPlan]);

  const NextButton = ({
    navigation,
    screen,
  }: {
    navigation: any;
    screen: string;
  }) => {
    return (
      <View className="flex flex-row justify-center   px-4">
        <TouchableOpacity
          onPress={handleDietPlan}
          className="flex w-full max-w-md rounded-lg px-6 py-4 bg-primary items-center justify-center"
        >
          <Text className="text-2xl font-semibold text-white">Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {gettingDietPlan ? (
        <GettingPlanReadyScreen />
      ) : (
        <SafeAreaView>
          <Text>We found a plan for you</Text>
        </SafeAreaView>
      )}
    </>
  );
};

type QuizStackParamList = {
  Preferences: undefined;
  Allergies: undefined;
  DietBudget: undefined;
  DietConfirmationScreen: undefined;
};

const Stack = createNativeStackNavigator<QuizStackParamList>();

export const QuizRoutes = (props: Props) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <BackButton />,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="Allergies" component={Allergies} />
        <Stack.Screen
          options={{
            title: "Budget",
          }}
          name="DietBudget"
          component={DietBudget}
        />
        <Stack.Screen
          name="DietConfirmationScreen"
          options={{ headerShown: false }}
          component={DietConfirmationScreen}
        />
      </Stack.Navigator>
      <StatusBar />
    </>
  );
};
