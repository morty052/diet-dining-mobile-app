import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import HorizontalRule from "../../components/ui/HorizontalRule";
import { SEMI_BOLD } from "../../constants/fontNames";
import { getItem, removeItem } from "../../utils/storage";
import * as Linking from "expo-linking";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useUserDetails } from "../../hooks/useUserDetails";
import { baseUrl } from "../../constants/baseUrl";

const Stack = createNativeStackNavigator();

type Props = {};

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            icon={"gift-outline"}
          />
          <AccountSettingsItem
            onPress={() => openLink("mailto:support@expo.dev")}
            subtitle="Manage your diet plan settings"
            name="Diet Plan"
            icon={"gift-outline"}
          />
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
    </SafeAreaView>
  );
};

const AccountDetailScreen = () => {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user_email } = useUserDetails();

  async function handlePress() {
    if (!email || !phone || !password) {
      return;
    }
    try {
      const expo_push_token = getItem("expo_push_token");
      const url = `${baseUrl}/auth/signup?email=${email}`;
      const res = await fetch(url);
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingHorizontal: 10, gap: 20 }}>
        <View style={{ gap: 4 }}>
          <Text>Email</Text>
          <TextInput
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
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Save</Text>
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
        headerTitle: "Profile",
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="AccountHome" component={AccountScreenHome} />
      <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
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
