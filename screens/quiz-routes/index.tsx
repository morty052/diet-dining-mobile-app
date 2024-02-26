import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState } from "react";
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

type Props = {};

const BackButtonheader = () => {
  const navigation = useNavigation();
  return (
    <View className="px-4 pt-14 bg-gray-200">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        <FontAwesome size={20} color="black" name="chevron-left" />
        <Text className="text-lg font-medium text-dark">Diet Planner</Text>
        <FontAwesome size={20} color="black" name="close" />
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
];

const QuestionItem = ({
  title,
  border,
  selected,
  name,
  handleSelect,
  subtitle,
}: {
  title: string;
  border?: boolean;
  selected: boolean;
  name: string;
  handleSelect: (name: string) => void;
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
      <CheckBox selected={selected} name={name} handleSelect={handleSelect} />
    </View>
  );
};

const QuestionGrid = ({
  questions,
  selected,
  setSelected,
}: {
  questions: { name: string; title: string; subtitle?: string }[];
  selected: string;
  setSelected: (name: string) => void;
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
      <View className=" px-4">
        {error && (
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
        )}
        <TouchableOpacity
          onPress={() => handleUserSelection(answer)}
          className="flex w-full max-w-md rounded-lg px-6 py-4 bg-primary  items-center justify-center"
        >
          <Text className="text-lg font-medium">Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

function Preferences({ navigation }: { navigation: any }) {
  const [selected, setSelected] = useState("");

  const { setMealPreference } = useQuizStore();

  return (
    <SafeAreaView
      edges={{
        top: "off",
        bottom: "additive",
      }}
      className="flex-1 flex justify-between bg-gray-200 px-4"
    >
      <View className=" py-8">
        <View className="py-8">
          <Text className="text-center font-medium text-dark  text-3xl">
            What best describes your meal preferences?
          </Text>
        </View>
        <QuestionGrid
          selected={selected}
          setSelected={setSelected}
          questions={preferenceAnswers}
        />
      </View>
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
    </SafeAreaView>
  );
}

const Allergies = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  const { setAllergy } = useQuizStore();
  return (
    <SafeAreaView
      edges={{
        top: "off",
        bottom: "additive",
      }}
      className="flex-1 flex justify-between bg-gray-200 px-4"
    >
      <View className=" py-8">
        <View className="py-8">
          <Text className="text-center text-dark  text-3xl">
            Do you have any food allergies?
          </Text>
        </View>
        <QuestionGrid
          selected={selected}
          setSelected={setSelected}
          questions={allergyAnswers}
        />
      </View>
      <NextButton
        handleSelect={(answer) => setAllergy(answer)}
        answer={selected}
        screen="DietBudget"
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const GettingPlanReadyScreen = () => {
  return (
    <SafeAreaView className="pt-8 bg-gray-200 flex-1">
      <LottieView
        source={sandwich}
        autoPlay
        loop
        style={{ width: 300, height: 300, alignSelf: "center" }}
      />
      <View className="px-2 space-y-2">
        <Text className="text-center text-dark  text-4xl font-semibold">
          Getting plan ready
        </Text>
        <Text className="text-center text-dark text-[15px]  font-medium">
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
    // setGettingDietPlan(true);
    navigation.navigate("DietConfirmationScreen");
  };

  useEffect(() => {
    if (!gettingDietPlan) {
      return;
    }
    const timer = setTimeout(() => {
      setGettingDietPlan(false);
      navigation.navigate("Diet");
    }, 8000);

    // return () => {
    //   clearTimeout(timer);
    // };
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
          <Text className="text-2xl font-semibold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {!gettingDietPlan ? (
        <SafeAreaView
          edges={{
            top: "off",
            bottom: "additive",
          }}
          className="flex flex-1 justify-between bg-gray-200 px-4"
        >
          <View className=" py-8">
            <View className="py-8">
              <Text className="text-center text-dark  text-3xl">
                How much would you like to spend on your daily diet?
              </Text>
            </View>
            <QuestionGrid
              selected={selected}
              setSelected={setSelected}
              questions={budgetAnswers}
            />
          </View>
          <NextButton screen="DietHome" navigation={navigation} />
        </SafeAreaView>
      ) : (
        <GettingPlanReadyScreen />
      )}
    </>
  );
};

const DietConfirmationScreen = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  const [gettingDietPlan, setGettingDietPlan] = useState(false);

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
      navigation.navigate("Diet");
    }, 8000);

    // return () => {
    //   clearTimeout(timer);
    // };
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
      {!gettingDietPlan ? (
        <SafeAreaView
          edges={{
            top: "off",
            bottom: "additive",
          }}
          className="flex flex-1 justify-between bg-gray-200 "
        >
          <View className="flex  items-center">
            <Text className="text-center text-dark  text-3xl my-6">
              We Found the Best Diet for you!
            </Text>
            <DietPlanCard />
          </View>
          <NextButton screen="DietHome" navigation={navigation} />
        </SafeAreaView>
      ) : (
        <GettingPlanReadyScreen />
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
          header: (navigation) => <BackButtonheader />,
        }}
      >
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="Allergies" component={Allergies} />
        <Stack.Screen name="DietBudget" component={DietBudget} />
        <Stack.Screen
          name="DietConfirmationScreen"
          component={DietConfirmationScreen}
        />
      </Stack.Navigator>
      <StatusBar />
    </>
  );
};
