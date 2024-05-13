import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SkeletonBase } from "../ui";
import { Skeleton } from "moti/skeleton";

type Props = {};

const width = Dimensions.get("screen").width;

export const Loader = (props: Props) => {
  return (
    <View>
      <Skeleton width={200} colorMode="light" />
      <ScrollView horizontal className="py-4">
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
      </ScrollView>

      <Skeleton width={200} colorMode="light" />
      <ScrollView horizontal className="py-4">
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
      </ScrollView>

      <Skeleton width={200} colorMode="light" />
      <ScrollView horizontal className="pt-4">
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
        <View className="mr-4">
          <SkeletonBase height={180} width={width * 0.7} shape="square" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
