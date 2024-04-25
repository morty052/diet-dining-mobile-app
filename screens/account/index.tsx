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

export const AccountScreen = (props: Props) => {
  const firstname = getItem("firstname");
  async function openLink(link: string) {
    await Linking.openURL(link);
  }
  return (
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
