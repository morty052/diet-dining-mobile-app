import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import HorizontalRule from "./HorizontalRule";

type Props = {
  children?: any;
  shape: "round" | "square";
  height: number;
  width: number;
};

const SkeletonBase = ({ children, shape, height, width }: Props) => {
  return (
    <Skeleton colorMode="light" height={height} width={width} radius={shape}>
      {children}
    </Skeleton>
  );
};

export const RestaurantSkeleton = () => {
  return (
    <>
      <Skeleton
        width={Dimensions.get("screen").width}
        height={300}
        colorMode="light"
      ></Skeleton>
      <View style={{ padding: 10, gap: 20 }}>
        <Skeleton width={200} colorMode="light" />
        <Skeleton width={150} colorMode="light" />
        <HorizontalRule />
        <Skeleton width={200} colorMode="light" />
        <Skeleton width={350} height={300} colorMode="light"></Skeleton>
      </View>
    </>
  );
};

export default SkeletonBase;

const styles = StyleSheet.create({});
