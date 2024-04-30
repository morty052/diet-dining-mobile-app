import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../../utils/storage";
import { baseUrl } from "../../constants/baseUrl";

type LoginResponseProps = {
  _id: string | null;
  user_firstname: string | null;
  status: "SUCCESS" | "ERROR";
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: Colors.gray,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      <Ionicons size={30} name="arrow-back" />
    </Pressable>
  );
};

const NextButton = ({
  handlePress,
  loading,
}: {
  handlePress: () => void;
  loading: boolean;
}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: 100,
        alignItems: "center",
      }}
    >
      {!loading && (
        <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
          Next
        </Text>
      )}
      {loading && <ActivityIndicator color={"white"} size={20} />}
    </Pressable>
  );
};

const LoginScreen = ({ navigation, route }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setloading] = React.useState(false);

  const passwordRef = React.useRef<TextInput>(null);

  async function handlePress() {
    if (!email || !password) {
      return;
    }
    setloading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const expo_push_token = getItem("expo_push_token");
      // const url = `https://diet-dining-server.onrender.com/auth/signin?user_email=${cleanEmail}&user_password=${password}&expo_push_token=${expo_push_token}`;
      const url = `${baseUrl}/auth/signin?user_email=${cleanEmail}&user_password=${password}&expo_push_token=${expo_push_token}`;

      const res = await fetch(url);
      const data: LoginResponseProps = await res.json();

      const { _id, status, user_firstname } = data;

      // FIXME ADD USER DETAILS AS SINGLE OBJECT
      if (status === "SUCCESS") {
        setItem("user_id", _id as string);
        setItem("firstname", user_firstname as string);
        setItem("user_email", cleanEmail);
        setItem("user_password", password);

        const user_details = {
          user_id: _id as string,
          user_email: cleanEmail,
          user_password: password,
          user_firstname,
        };

        setItem("user_details", JSON.stringify(user_details));

        setloading(false);
        navigation.navigate("LocationPermission");
      }

      if (status === "ERROR") {
        console.log(status);
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setloading(false);
      setError(true);
    }

    // navigation.navigate("PasswordScreen", {
    //   email,
    //   password,
    // });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.mainText}>Welcome back.</Text>
          <Text style={styles.subtitle}>
            Please enter your email and password to continue.
          </Text>
          <View style={styles.inputsContainer}>
            <TextInput
              autoFocus
              value={email}
              onChangeText={(text) => {
                if (error) {
                  setError(false);
                }
                setEmail(text);
              }}
              placeholderTextColor={Colors.dark}
              placeholder="Email"
              style={styles.input}
            />
            <Pressable
              onPress={() => passwordRef.current?.focus()}
              style={[
                { flexDirection: "row", alignItems: "center" },
                styles.input,
              ]}
            >
              <TextInput
                ref={passwordRef}
                value={password}
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                onChangeText={(text) => {
                  if (error) {
                    setError(false);
                  }
                  setPassword(text);
                }}
                placeholderTextColor={Colors.dark}
                placeholder="Password"
                style={styles.passwordInput}
              />
              <Ionicons
                name={!hidePassword ? "eye-off" : "eye-outline"}
                size={18}
                onPress={() => setHidePassword(!hidePassword)}
              />
            </Pressable>
            {error && (
              <Text style={{ textAlign: "center", color: Colors.danger }}>
                Invalid email or password
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <BackButton />
          <NextButton loading={loading} handlePress={handlePress} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },
  innerContainer: {
    padding: 10,
  },
  mainText: {
    fontFamily: SEMI_BOLD,
    color: Colors.dark,
    fontSize: 24,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
  inputsContainer: {
    gap: 20,
    paddingTop: 28,
  },
  input: {
    backgroundColor: Colors.gray,
    padding: 20,
    borderRadius: 10,
  },
  passwordInput: {
    backgroundColor: "transparent",
    // padding: 20,
    borderRadius: 10,
    flex: 1,
  },
});
