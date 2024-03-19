import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const BackButton = (props: Props) => {
  const navigate = useNavigation();
  return (
    <Pressable onPress={() => navigate.goBack()}>
      <Ionicons size={20} name="arrow-back" />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
