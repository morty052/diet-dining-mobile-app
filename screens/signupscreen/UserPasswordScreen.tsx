import {
  ActivityIndicator,
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

const NextButton = ({
  handlePress,
  loading,
}: {
  handlePress: () => void;
  loading?: boolean;
}) => {
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
      {!loading && (
        <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
          Next
        </Text>
      )}
      {loading && <ActivityIndicator size={20} color="white" />}
    </Pressable>
  );
};

const UserPasswordScreen = ({ navigation, route }: any) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { firstName, lastName, email } = route.params;

  async function handlePress() {
    setLoading(true);
    if (!password || !confirmPassword) {
      return;
    }

    try {
      const expo_push_token = getItem("expo_push_token");

      const url = `${baseUrl}/auth/signup?email=${email}&expo_push_token=${expo_push_token}&password=${password}&firstname=${firstName}&lastname=${lastName}`;
      const res = await fetch(url);
      const { _id } = await res.json();
      setItem("user_id", _id);
      setItem("firstname", firstName);
      setItem("ONBOARDED", "TRUE");
      navigation.navigate("LocationPermission");
      setLoading(false);
    } catch (err: any) {
      console.error(err);

      setLoading(false);
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
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={Colors.dark}
              placeholder="Password"
              style={styles.input}
            />
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
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
            <NextButton
              loading={loading}
              handlePress={() => {
                if (loading) {
                  return;
                }
                handlePress();
              }}
            />
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
