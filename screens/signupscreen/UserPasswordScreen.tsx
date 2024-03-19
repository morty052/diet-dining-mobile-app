import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../lib/secure-store";
import { setItem } from "../../utils/storage";

type Props = {};

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

const NextButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
        Next
      </Text>
    </Pressable>
  );
};

const UserPasswordScreen = ({ navigation, route }: any) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { firstName, lastName, email } = route.params;

  async function handlePress() {
    if (!password || !confirmPassword) {
      return;
    }

    try {
      const expo_push_token = await getValueFor("expo_push_token");

      // const url = `https://e48d-102-216-10-2.ngrok-free.app/auth/signup?email=${email}&expo_push_token=${expo_push_token}`;
      // const url = `https://diet-dining-server.onrender.com/auth/signup?email=${emailAddress}`;
      // const url = `http://localhost:3000/auth/signup?email=${email}`;
      // const details = {
      //   firstname: firstName,
      //   lastname: lastName,
      //   email,
      //   password,
      //   expo_push_token,
      // };
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(details),
      // };
      // const res = await fetch(url, options);
      // const { _id } = await res.json();
      // await setItem("user_id", _id);
      setItem("firstname", firstName);
      setItem("ONBOARDED", "TRUE");
      navigation.navigate("LocationPermission");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainText}>Create password</Text>
          <Text style={styles.subtitle}>
            Your password must be at least 8 characters long, and contain at
            least one letter and one digit.
          </Text>
          <View style={styles.inputsContainer}>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={Colors.dark}
              placeholder="Password"
              style={styles.input}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholderTextColor={Colors.dark}
              placeholder="Confirm password"
              style={styles.input}
            />
          </View>
        </View>
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <BackButton />
            <NextButton handlePress={handlePress} />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default UserPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
});
