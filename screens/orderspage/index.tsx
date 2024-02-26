import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { EmptyState, ErrorState, Loader } from "../../components";
import { getValueFor } from "../../lib/secure-store";
import { useQuery } from "@tanstack/react-query";
type Props = {};

export const OrdersPage = (props: Props) => {
  const getUserOrders = async () => {
    const user_id = await getValueFor("user_id");
    const res = await fetch(
      `http://localhost:3000/orders/get-user-orders?user_id=${user_id}`
    );
    const data = await res.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["orders"], queryFn: getUserOrders });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <View>
      {orders?.length < 1 && (
        <EmptyState
          secondaryText="Order an item to track it here"
          description="No orders yet"
        />
      )}
      {orders?.length > 0 && (
        <EmptyState
          secondaryText="Order an item to track it here"
          description="No orders yet"
        />
      )}
    </View>
  );
};
