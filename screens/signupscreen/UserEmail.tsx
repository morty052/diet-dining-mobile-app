import {
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
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

const UserEmail = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");

  function handlePress() {
    if (!email) {
      return;
    }

    navigation.navigate("UserDetails", {
      email,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.mainText}>What's your email address</Text>
          <Text style={styles.subtitle}>Please enter your email below.</Text>
          <View style={styles.inputsContainer}>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={Colors.dark}
              placeholder="name@example.com"
              style={styles.input}
            />
          </View>
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.link}
          >
            I already have an account.
          </Text>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserEmail;

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
  link: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: MEDIUM,
    color: Colors.link,
    textAlign: "center",
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
