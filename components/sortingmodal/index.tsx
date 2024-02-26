import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  modalOpen: boolean;
  setModalOpen: any;
};

interface IQuickFilterItem {
  title: string;
  icon: any;
}

const QuickFilterItem = ({ title, icon }: IQuickFilterItem) => {
  return (
    <View className="bg-gray-200 p-4 border-b border-primary flex-row justify-between items-center">
      <View className="flex-row flex-1 items-center gap-2">
        <Ionicons name={icon} />
        <Text className="text-[16px]">{title}</Text>
      </View>
      <Ionicons name={"arrow-forward"} size={20} />
    </View>
  );
};

const CategoryFilterItem = ({ title, icon }: IQuickFilterItem) => {
  return (
    <View className="bg-gray-200 p-4 border-b border-primary flex-row justify-between items-center">
      <View className="flex-row flex-1 items-center gap-2">
        <Text className="text-[16px]">{title}</Text>
      </View>
      <Ionicons name={"arrow-forward"} size={20} />
    </View>
  );
};

const ConfirmButton = () => {
  return (
    <View className="absolute bottom-0 border-t left-0  right-0  h-28 p-4 justify-end">
      <TouchableOpacity className="w-full  mb-4 p-4 rounded-lg justify-center flex-row bg-primary">
        <Text className="text-white text-[18px] font-bold tracking-wide">
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SortingModal = ({ modalOpen, setModalOpen }: Props) => {
  return (
    <Modal animationType="slide" visible={modalOpen}>
      <SafeAreaView className="relative flex-1">
        <View className={styles.headerContainer}>
          <TouchableOpacity onPress={() => setModalOpen(false)}>
            <Ionicons name="close" size={25} />
          </TouchableOpacity>
          <View className={styles.headerTitleContainer}>
            <Text className={styles.headerTitle}>Filter</Text>
          </View>
          <View className={""}>
            <Ionicons name="help" size={25} />
          </View>
        </View>
        <View className="my-4">
          <QuickFilterItem icon={"star"} title="Highest Rating" />
          <QuickFilterItem icon={"star"} title="Offers" />
          <QuickFilterItem icon={"star"} title="Distance" />
          <QuickFilterItem icon={"star"} title="Favorites" />
        </View>
        <Text className="ml-2 text-[20px] font-bold text-dark">Categories</Text>
        <View className="mt-6">
          <CategoryFilterItem icon={"star"} title="Highest Rating" />
          <CategoryFilterItem icon={"star"} title="Offers" />
          <CategoryFilterItem icon={"star"} title="Distance" />
          <CategoryFilterItem icon={"star"} title="Favorites" />
        </View>
        <ConfirmButton />
      </SafeAreaView>
    </Modal>
  );
};

export default SortingModal;

const styles = {
  headerContainer: "flex-row items-center justify-between px-2",
  headerTitleContainer: " flex-row align-center  ",
  headerTitle: " text-[18px] font-bold text-dark ",
};
