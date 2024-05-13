import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import HorizontalRule from "../../components/ui/HorizontalRule";
import { SEMI_BOLD } from "../../constants/fontNames";
import { getItem, removeItem, setItem } from "../../utils/storage";
import * as Linking from "expo-linking";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useUserDetails } from "../../hooks/useUserDetails";
import { baseUrl } from "../../constants/baseUrl";
import Toast from "react-native-root-toast";
import BackButton from "../../components/ui/BackButton";

const Stack = createNativeStackNavigator();

type Props = {};

async function UpdateUserEmail(user_email: string, user_id: string) {
  const res = await fetch(`${baseUrl}/auth/update-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      user_email,
    }),
  });
  const data = await res.json();
  return data;
}

async function UpdateUserName({
  user_id,
  user_firstname,
  user_lastname,
}: {
  user_id: string;
  user_firstname: string;
  user_lastname: string;
}) {
  const res = await fetch(`${baseUrl}/user/update-name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      user_firstname,
      user_lastname,
    }),
  });
  const data = await res.json();
  return data;
}

async function UpdateUserPassword(user_password: string, user_id: string) {
  const res = await fetch(`${baseUrl}/auth/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      user_password,
    }),
  });
  const data = await res.json();
  return data;
}

const AccountSettingsItem = ({
  name,
  icon,
  subtitle,
  onPress,
}: {
  name: string;
  icon: any;
  subtitle: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 12,
        borderColor: Colors.gray,
      }}
    >
      <Ionicons size={25} name={icon} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>{name}</Text>
        <Text style={{ fontWeight: "normal", fontSize: 14 }}>{subtitle}</Text>
      </View>
      <Ionicons color={Colors.dark} size={25} name={"chevron-forward"} />
    </Pressable>
  );
};

const AccountQuickLinkCard = ({ name, icon }: { name: string; icon: any }) => {
  const width = Dimensions.get("screen").width;

  return (
    <View
      style={{
        height: width * 0.3,
        width: width * 0.3,
        backgroundColor: "rgba(229 231 235 / 0.5)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        rowGap: 10,
      }}
    >
      <Ionicons size={40} name={icon} />
      <Text>{name}</Text>
    </View>
  );
};

const AccountScreenHome = (props: Props) => {
  const firstname = getItem("firstname");
  async function openLink(link: string) {
    await Linking.openURL(link);
  }

  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.accountPageheader}>
          <Text style={styles.userFullName}>{firstname}</Text>
          <Pressable
            onPress={async () => removeItem("ONBOARDED")}
            style={styles.userIconContainer}
          >
            <Ionicons color={"white"} size={25} name="person-outline" />
          </Pressable>
        </View>
        {/* CARDS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <AccountQuickLinkCard icon={"heart-outline"} name="Favourites" />
          <AccountQuickLinkCard icon={"fast-food-outline"} name="Diet Plan" />
          <AccountQuickLinkCard icon={"bag-outline"} name="Orders" />
        </View>
        <HorizontalRule />
        <View style={styles.accountSettingsContainer}>
          <AccountSettingsItem
            onPress={() => openLink("tel:+123456789")}
            subtitle="Get in touch with us"
            name="Help"
            icon={"help-circle-outline"}
          />
          <AccountSettingsItem
            onPress={() => navigation.navigate("AccountDetail")}
            subtitle="Manage account details"
            name="Account Settings"
            icon={"at"}
          />
          <AccountSettingsItem
            onPress={() => navigation.navigate("PersonalInfo")}
            subtitle="Personal Information"
            name="Personal Information"
            icon={"person-outline"}
          />
          {/* <AccountSettingsItem
            onPress={() => console.log("mailto:support@expo.dev")}
            subtitle="Manage your diet plan settings"
            name="Diet Plan"
            icon={"fast-food-outline"}
          /> */}
          <AccountSettingsItem
            onPress={() => console.log("https://merchants.dietdining.org")}
            subtitle="Manage rewards grapes "
            name="Rewards"
            icon={"gift-outline"}
          />
          <AccountSettingsItem
            onPress={() => console.log("https://merchants.dietdining.org")}
            subtitle="Manage privacy settings"
            name="Privacy"
            icon={"eye"}
          />
          <AccountSettingsItem
            onPress={() => openLink("https://merchants.dietdining.org")}
            subtitle="Manage notifications and related settings"
            name="Become a partner restaurant"
            icon={"storefront-outline"}
          />
          <AccountSettingsItem
            onPress={() => openLink("https://drivers.dietdining.org")}
            subtitle="Read about diet dining and who we are"
            name="Become a driver"
            icon={"car-outline"}
          />
          <AccountSettingsItem
            onPress={() => openLink("mailto:info@dietdining.org")}
            subtitle="Get in touch with us about sponsorship and enquiry"
            name="Sponsorship and enquiry"
            icon={"gift-outline"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const AccountDetailScreen = () => {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const user_email = getItem("user_email");
  const user_id = getItem("user_id");

  const changes = React.useMemo(() => {
    if (email || password || phone) {
      return true;
    }
  }, [email, password, phone]);

  async function handlePress() {
    if (loading) {
      return;
    }
    setLoading(true);
    if (email) {
      const res = await UpdateUserEmail(email, user_id as string);
      setItem("user_email", email);
    }

    if (password) {
      const res = await UpdateUserPassword(password, user_id as string);
      setItem("user_password", password);
    }

    setEmail("");
    setPassword("");
    setLoading(false);
    Toast.show("Updated successfully.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: "#90C466",
      textColor: "#ffffff",
      opacity: 1,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingHorizontal: 10, gap: 20 }}>
        <View style={{ gap: 4 }}>
          <Text>Email</Text>
          <TextInput
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputMode="email"
            placeholder={user_email}
            style={{
              height: 40,
              backgroundColor: Colors.gray,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{ gap: 4 }}>
          <Text>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            inputMode="email"
            style={{
              height: 40,
              backgroundColor: Colors.gray,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{ gap: 4 }}>
          <Text>Password</Text>
          <TextInput
            value={password}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            placeholder={"**********"}
            secureTextEntry
            style={{
              height: 40,
              backgroundColor: Colors.gray,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>

        <Pressable
          onPress={handlePress}
          style={{
            backgroundColor: changes ? Colors.primary : Colors.gray,
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading && (
            <Text style={{ color: changes ? "white" : "gray" }}>Save</Text>
          )}
          {loading && <ActivityIndicator color={"white"} size={20} />}
        </Pressable>
      </View>
    </ScrollView>
  );
};

const PersonalInfoScreen = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const user_email = getItem("user_email");
  const user_id = getItem("user_id");

  const changes = React.useMemo(() => {
    if (firstname || lastname) {
      return true;
    }
  }, [firstname, lastname]);

  async function handlePress() {
    if (loading || !firstname || !lastname) {
      return;
    }
    setLoading(true);

    if (firstname || lastname) {
      await UpdateUserName({
        user_id: user_id as string,
        user_firstname: firstname,
        user_lastname: lastname,
      });
    }
    setFirstname("");
    setLastname("");
    setLoading(false);
    Toast.show("Updated successfully.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: "#90C466",
      textColor: "#ffffff",
      opacity: 1,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingHorizontal: 10, gap: 20 }}>
        <View style={{ gap: 4 }}>
          <Text>First name</Text>
          <TextInput
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
            placeholder={user_email}
            style={{
              height: 40,
              backgroundColor: Colors.gray,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{ gap: 4 }}>
          <Text>Last name</Text>
          <TextInput
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            inputMode="email"
            style={{
              height: 40,
              backgroundColor: Colors.gray,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>

        <Pressable
          onPress={handlePress}
          style={{
            backgroundColor: changes ? Colors.primary : Colors.gray,
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading && (
            <Text style={{ color: changes ? "white" : "gray" }}>Save</Text>
          )}
          {loading && <ActivityIndicator color={"white"} size={20} />}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export const AccountScreen = (props: Props) => {
  const firstname = getItem("firstname");
  async function openLink(link: string) {
    await Linking.openURL(link);
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitle: "Profile",
        headerShown: true,
        headerBackTitleVisible: true,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="AccountHome" component={AccountScreenHome} />
      <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    paddingTop: 10,

    flex: 1,
    backgroundColor: "white",
  },
  accountPageheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  userFullName: {
    fontSize: 30,
    color: Colors.dark,
    fontWeight: "700",
    fontFamily: SEMI_BOLD,
  },
  userIconContainer: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderColor: "white",
  },
  accountSettingsContainer: {
    rowGap: 50,
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
});
