import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";

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

export default SkeletonBase;

const styles = StyleSheet.create({});
