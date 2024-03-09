import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import React from "react";
import { EmptyState, ErrorState, Loader } from "../../components";
import { getValueFor } from "../../lib/secure-store";
import { useQuery } from "@tanstack/react-query";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalRule from "../../components/ui/HorizontalRule";
type Props = {};

type OrderCardProps = {
  total: number;
  vendor: { store_name: string };
  status: { completed: boolean; pending: boolean };
};

const OrderCard = ({ order }: { order: OrderCardProps }) => {
  return (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        gap: 5,
        borderColor: Colors.primary,
        backgroundColor: Colors.gray,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: SEMI_BOLD,
          color: Colors.dark,
        }}
      >
        {order.status.pending ? "Confirming your order " : "Completed"}
      </Text>
      <Text
        style={{
          fontFamily: SEMI_BOLD,
          fontSize: 17,
          color: Colors.dark,
        }}
      >
        {order.vendor.store_name}
      </Text>
      {/* ICONS */}
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(229 231 235)",
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Ionicons size={30} name="fast-food-outline" />
        </View>
        <View
          style={{
            backgroundColor: "rgba(229 231 235)",
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Ionicons size={30} name="storefront-outline" />
        </View>
        <View
          style={{
            backgroundColor: "rgba(229 231 235)",
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Ionicons size={34} name="car-outline" />
        </View>
        <View
          style={{
            backgroundColor: "rgba(229 231 235)",
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Ionicons size={30} name="home-outline" />
        </View>
        <View
          style={{
            position: "absolute",
            left: 4,
            right: 4,
            zIndex: -4,
            backgroundColor: Colors.gray,
            height: 4,
          }}
        ></View>
      </View>
    </View>
  );
};

export const OrdersPage = ({}) => {
  const getUserOrders = async () => {
    const user_id = await getValueFor("user_id");
    const res = await fetch(
      `http://localhost:3000/orders/get-user-orders?user_id=${user_id}`
    );
    const orders: OrderCardProps[] = await res.json();

    const pendingOrders = orders?.filter((order) => order.status.pending);
    const completedOrders = orders?.filter((order) => order.status.completed);
    return { pendingOrders, orders, completedOrders };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorState />;
  }

  const { pendingOrders, orders, completedOrders } = data ?? {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {orders && orders?.length < 1 && (
        <EmptyState
          secondaryText="Order an item to track it here"
          description="No orders yet"
        />
      )}
      <ScrollView>
        {pendingOrders && pendingOrders?.length > 0 && (
          <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.orderText}>Orders</Text>
            </View>
            <HorizontalRule />

            <View style={styles.ordersContainer}>
              <Text style={styles.progressText}>In Progress</Text>
              {pendingOrders.map((order: OrderCardProps, index: number) => (
                <OrderCard key={index} order={order} />
              ))}
            </View>
          </View>
        )}

        {completedOrders && completedOrders.length > 0 && (
          <View style={styles.mainContainer}>
            <HorizontalRule />

            <View style={styles.ordersContainer}>
              <Text style={styles.progressText}>Completed</Text>
              {completedOrders?.map((order: OrderCardProps, index: number) => (
                <OrderCard key={index} order={order} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: 10,
  },
  headerContainer: {
    paddingHorizontal: 10,
  },
  orderText: {
    fontFamily: SEMI_BOLD,
    fontSize: 30,
    marginVertical: 10,
  },
  progressText: { fontFamily: SEMI_BOLD, fontSize: 20, marginBottom: 10 },
  ordersContainer: { paddingHorizontal: 10, paddingVertical: 20, gap: 15 },
  iconsWrapper: {},
  iconContainer: {},
});
