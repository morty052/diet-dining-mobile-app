import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const AccountSettingsItem = ({
  name,
  icon,
  subtitle,
}: {
  name: string;
  icon: any;
  subtitle: string;
}) => {
  return (
    <View
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
    </View>
  );
};

export const AccountScreen = (props: Props) => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 35, color: Colors.dark, fontWeight: "700" }}>
          Patrick Star
        </Text>
        <View
          style={{
            borderWidth: 1,
            height: 50,
            width: 50,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
            borderColor: "white",
          }}
        >
          <Ionicons color={"white"} size={25} name="person-outline" />
        </View>
      </View>
      <View style={{ rowGap: 50, paddingTop: 40, paddingHorizontal: 10 }}>
        <AccountSettingsItem
          subtitle="Get in touch with us"
          name="Help"
          icon={"help-circle-outline"}
        />
        <AccountSettingsItem
          subtitle="Manage your diet plan settings"
          name="Diet Plan"
          icon={"gift-outline"}
        />
        <AccountSettingsItem
          subtitle="Manage rewards grapes "
          name="Rewards"
          icon={"gift-outline"}
        />
        <AccountSettingsItem
          subtitle="Manage privacy settings"
          name="Privacy"
          icon={"eye"}
        />
        <AccountSettingsItem
          subtitle="Manage notifications and related settings"
          name="Notifications"
          icon={"eye"}
        />
        <AccountSettingsItem
          subtitle="Read about diet dining and who we are"
          name="About"
          icon={"information"}
        />
      </View>
    </ScrollView>
  );
};
