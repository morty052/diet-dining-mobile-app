import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import React from "react";
import { EmptyState, ErrorState, Loader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalRule from "../../components/ui/HorizontalRule";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { Skeleton } from "moti/skeleton";
import { getItem } from "../../utils/storage";
import { baseUrl } from "../../constants/baseUrl";
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
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 5,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // borderColor: Colors.primary,
        backgroundColor: "white",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 15,
            fontFamily: SEMI_BOLD,
            color: Colors.dark,
          }}
        >
          {order.status.pending ? "Confirming your order " : "Completed"}
        </Text>
        <Text
          style={{
            fontFamily: SEMI_BOLD,
            fontSize: 18,
            color: Colors.dark,
          }}
        >
          {order.vendor.store_name}
        </Text>
      </View>
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
        <Ionicons color={Colors.primary} size={25} name="fast-food" />
        <Skeleton
          height={4}
          radius={20}
          width={40}
          colorMode="light"
          colors={["#E5E5E5", Colors.primary]}
          // style={{
          //   backgroundColor: Colors.primary,
          //   height: 4,
          //   width: 40,
          //   borderRadius: 20,
          // }}
        ></Skeleton>
        <Ionicons size={25} name="storefront-outline" />
        <Skeleton
          height={4}
          radius={20}
          width={40}
          colorMode="light"
          colors={["#E5E5E5", Colors.dark]}
          // style={{
          //   backgroundColor: Colors.primary,
          //   height: 4,
          //   width: 40,
          //   borderRadius: 20,
          // }}
        ></Skeleton>
        <Ionicons size={28} name="car-outline" />
        <Skeleton
          height={4}
          radius={20}
          width={40}
          colorMode="light"
          colors={["#E5E5E5", Colors.dark]}
          // style={{
          //   backgroundColor: Colors.primary,
          //   height: 4,
          //   width: 40,
          //   borderRadius: 20,
          // }}
        ></Skeleton>
        <Ionicons size={25} name="home-outline" />
      </View>
    </View>
  );
};

export const OrdersPage = () => {
  const getUserOrders = async () => {
    const user_id = getItem("user_id");
    console.log(user_id);
    const res = await fetch(
      `${baseUrl}/orders/get-user-orders?user_id=${user_id}`
    );
    const orders: OrderCardProps[] = await res.json();

    const pendingOrders = orders?.filter((order) => order.status.pending);
    const completedOrders = orders?.filter((order) => order.status.completed);
    return { pendingOrders, orders, completedOrders };
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });

  useRefreshOnFocus(refetch);

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
  progressText: { fontFamily: MEDIUM, fontSize: 20, marginBottom: 10 },
  ordersContainer: { paddingHorizontal: 10, paddingVertical: 20, gap: 15 },
  iconsWrapper: {},
  iconContainer: {},
});
