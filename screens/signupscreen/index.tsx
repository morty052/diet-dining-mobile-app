import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { Button } from "../../components";
import { googleLogo } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { useSignUp } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated, { SlideInDown } from "react-native-reanimated";
import Foodbg from "../../assets/foodbg.png";
import emailImage from "../../assets/emailimage.png";
import { StatusBar } from "expo-status-bar";
import { save } from "../../lib/secure-store";
import Colors from "../../constants/colors";

const Stack = createNativeStackNavigator();

type Props = {};

const SignUpForm = ({
  emailAddress,
  setEmailAddress,
  handlePress,
}: {
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  handlePress: () => void;
}) => {
  const navigation = useNavigation();

  async function handleOldUser() {
    await save("ONBOARDED", "TRUE");
    navigation.navigate("App");
  }

  return (
    <Animated.View
      entering={SlideInDown.duration(900)}
      className=" absolute bottom-0 h-[50%] left-0 right-0 z-10"
    >
      <Animated.View className="flex bg-white flex-1  rounded-t-2xl pt-4 px-4">
        <Text className="text-center text-lg font-medium text-dark">
          Welcome
        </Text>
        <Text className="text-center  font-medium text-dark">
          Lets's get started with your email
        </Text>

        {/* BUTTON AND INPUT */}
        <View className="py-4">
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(email) => setEmailAddress(email)}
            placeholder="Email"
            className="border border-gray-400 text-center rounded-lg p-2"
          />

          <Button
            textStyle="text-white"
            // onPress={() => navigation.navigate("App")}
            onPress={handlePress}
            style="bg-dark w-full text-white mt-4"
            title="Sign Up"
          />

          <Text
            onPress={() => handleOldUser()}
            style={{ color: Colors.link }}
            className="text-center mt-2  font-medium "
          >
            i already have an account
          </Text>
        </View>
        {/* DIVIDER */}
        <View className="flex pt-4 flex-row justify-center items-center">
          <View className="border border-gray-300 flex-1"></View>
          <Text className="text-center   mx-2">Or with</Text>
          <View className="border border-gray-300 flex-1"></View>
        </View>

        {/* GOOGLE BUTTON */}
        <View>
          <View className="font-medium flex-row items-center text-center border-gray-300 border rounded-2xl p-2 mt-4">
            <Image className="h-8 w-8" source={googleLogo} />
            <View className="flex-1  pr-6">
              <Text className="text-lg font-medium text-center">Google</Text>
            </View>
          </View>
        </View>

        {/* TERMS */}
        <Pressable onPress={() => navigation.navigate("App")} className=" mt-3">
          <Text className="text-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Privacy Policy and cookie policy
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const Header = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View className=" py-2 flex items-center flex-row justify-between px-2">
      <Feather
        onPress={() => navigation.goBack()}
        name="arrow-left"
        size={24}
        color="black"
      />
    </View>
  );
};

const MainSignUpScreen = () => {
  const [email, setEmail] = React.useState("");

  const { isLoaded, signUp, setActive } = useSignUp();

  const navigation = useNavigation();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const emailAddress = email.trim();
      await signUp.create({
        emailAddress,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      // setPendingVerification(true);

      // @ts-ignore
      navigation.navigate("EmailVerificationScreen", {
        emailAddress,
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={Foodbg}
      className="flex flex-1 h-screen pt-12 px-4  relative"
    >
      <View className="absolute bottom-0 top-0 left-0 right-0 bg-black/40"></View>
      <SignUpForm
        handlePress={onSignUpPress}
        emailAddress={email}
        setEmailAddress={setEmail}
      />
      {/* <StatusBar hidden={true} /> */}
    </ImageBackground>
  );
};

const OTPInput = ({
  onPressVerify,
  code,
  setCode,
}: {
  onPressVerify: (code: string) => void;
  code: string;
  setCode: any;
}) => {
  const codeInputOneRef = React.useRef<TextInput>(null);
  const codeInputTwoRef = React.useRef<TextInput>(null);
  const codeInputThreeRef = React.useRef<TextInput>(null);
  const codeInputFourRef = React.useRef<TextInput>(null);
  const codeInputFiveRef = React.useRef<TextInput>(null);
  const codeInputSixRef = React.useRef<TextInput>(null);

  const code_length = 6;

  const onchange = (text: string, ref: any, index: number) => {
    if (index === code_length) {
      setCode((prev: string) => prev + text);
      onPressVerify(code + text);
      return;
    }
    if (text !== "") {
      setCode((prev: string) => prev + text);
      ref.current?.focus();
    }
  };

  React.useEffect(() => {
    codeInputOneRef.current?.focus();
  }, []);

  return (
    <View className=" flex-row gap-x-2">
      <TextInput
        autoFocus
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputTwoRef, 1);
        }}
        ref={codeInputOneRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputThreeRef, 2);
        }}
        ref={codeInputTwoRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputFourRef, 3);
        }}
        ref={codeInputThreeRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputFiveRef, 4);
        }}
        ref={codeInputFourRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputSixRef, 5);
        }}
        ref={codeInputFiveRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputSixRef, 6);
        }}
        ref={codeInputSixRef}
      />
    </View>
  );
};

const EmailVerificationScreen = ({ navigation, route }: any) => {
  const [code, setCode] = React.useState<string>("");

  const { emailAddress } = route.params;

  const { isLoaded, signUp, setActive } = useSignUp();

  const onPressVerify = async (code: string) => {
    if (!isLoaded || !emailAddress) {
      return;
    }

    try {
      console.log("code", code);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // await setActive({ session: completeSignUp.createdSessionId });

      const res = await fetch(
        // `http://localhost:3000/auth/signup?email=${emailAddress}`
        `https://diet-dining-server.onrender.com/auth/signup?email=${emailAddress}`
      );
      const { _id } = await res.json();

      await save("user_id", _id);

      // @ts-ignore
      navigation.navigate("LocationPermission");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setCode("");
    }
  };
  return (
    <View className="flex bg-white flex-1 h-screen pt-12   relative">
      <Header />
      <View className="pt-4 px-4">
        <Image resizeMode="contain" className="h-40 w-40" source={emailImage} />
        <Text className="text-2xl text-dark font-medium">
          Lets verify your email
        </Text>
        <Text>
          We sent a code to your email please enter it below to continue
        </Text>
      </View>
      <View className="p-4">
        <OTPInput
          code={code as string}
          setCode={setCode}
          onPressVerify={(code: string) => onPressVerify(code)}
        />
      </View>
    </View>
  );
};

export const SignUpScreen = (props: Props) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);

      // navigation.navigate("EmailVerificationScreen");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async (code: number) => {
    // if (!isLoaded) {
    //   return;
    // }

    // try {
    //   const completeSignUp = await signUp.attemptEmailAddressVerification({
    //     code,
    //   });

    //   // await setActive({ session: completeSignUp.createdSessionId });
    //   console.info("completeSignUp", completeSignUp);
    // } catch (err: any) {
    //   console.error(JSON.stringify(err, null, 2));
    // }

    console.log("verify email code", code);
  };

  return (
    // <>
    //   {!pendingVerification ? (
    //     <MainSignUpScreen />
    //   ) : (
    //     <EmailVerificationScreen />
    //   )}
    // </>
    <Stack.Navigator initialRouteName="MainSignUpScreen">
      <Stack.Screen
        name="MainSignUpScreen"
        component={MainSignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
