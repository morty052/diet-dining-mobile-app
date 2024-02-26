import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useMemo } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EmptyState } from "../../components";
import { Ivendor, useCartStore } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type Props = {};

const Stack = createNativeStackNavigator();

const CheckoutButton = () => {
  const { cartItems, getCartTotal } = useCartStore();

  const total = useMemo(() => getCartTotal(), [cartItems]);
  const cartIsEmpty = useMemo(() => cartItems.length == 0, [cartItems]);

  const navigate = useNavigation();

  return (
    <View className="absolute bg-white  bottom-0 left-0 right-0 pb-10 pt-6 space-y-5 border-gray-300 px-4 border-t">
      <View className="flex-row items-center justify-between">
        <Text className="text-center font-medium text-2xl text-dark">
          Total:
        </Text>
        <Text className="text-center font-medium text-2xl text-dark">
          ${total}
        </Text>
      </View>
      <TouchableOpacity
        onPress={
          cartIsEmpty
            ? () => navigate.navigate("Home")
            : () => navigate.navigate("Checkout")
        }
        className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center"
      >
        <Text className=" text-white text-xl font-medium">
          {!cartIsEmpty ? "Checkout" : "Continue Shopping"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BackButtonheader = () => {
  const navigation = useNavigation();
  return (
    <View className="px-1 pt-12 ">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        {/* <View className="border h-8 w-8 rounded-full flex justify-center items-center">
        </View> */}
        <AntDesign size={20} color="black" name="arrowleft" />
      </Pressable>
    </View>
  );
};

const CheckOutItem = ({
  image,
  name,
  quantity,
  total,
  handleReduceQuantity,
  handleIncreaseQuantity,
}: {
  image: any;
  name: string;
  quantity: number;
  total: number;
  handleReduceQuantity: any;
  handleIncreaseQuantity: any;
}) => {
  return (
    <View className="pt-4  flex-row items-center justify-between">
      <View className=" flex-1">
        <Text className="text-xl font-medium text-dark">{name}</Text>
        <Text className="text-lg  text-dark">${total}</Text>
        <View className="flex-row items-center space-x-2 ">
          <TouchableOpacity onPress={handleReduceQuantity}>
            <AntDesign name="minuscircleo" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg text-dark">{quantity}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="relative">
        <Image resizeMode="contain" className="h-32 w-40" source={image} />
        <View className=" absolute top-0 right-2 rounded-full flex justify-center items-center h-8 w-8 bg-dark">
          <Text className="text-white">{quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const VendorCard = ({ vendor }: { vendor: Ivendor }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        // @ts-ignore
        navigate.navigate("Checkout", {
          // @ts-ignore
          store_name: vendor.store_name,
          store_id: vendor._id,
        })
      }
      className=" flex flex-row items-center  py-4"
    >
      <Image
        resizeMode="cover"
        source={{ uri: vendor.store_logo }}
        className=" h-20 w-20 rounded-full"
      />
      <View className="flex-1 border-b border-primary/50 pb-4 flex flex-row items-center justify-between ml-4 ">
        <View className="gap-1">
          <Text className="font-medium text-[18px]">{vendor.store_name}</Text>
          <Text className="">
            {vendor.vendorItemsCount} item - ${vendor.vendorTotal}
          </Text>
          <Text className="">Deliver to Home address</Text>
        </View>
        <Ionicons size={20} color={Colors.primary} name="chevron-forward" />
      </View>
    </TouchableOpacity>
  );
};

const InnerCart = ({ route, navigation }) => {
  const { store_name } = route.params;
  const { cartItems, decreaseItemQuantity, increaseItemQuantity } =
    useCartStore();

  useEffect(() => {
    navigation.setOptions({
      title: store_name,
    });
  }, []);

  const currentVendorItems = useMemo(
    () =>
      cartItems.filter((cartItem) => cartItem.vendor.store_name == store_name),
    []
  );

  return (
    <View className="space-y-4 bg-gray-200 relative flex-1 p-2">
      {currentVendorItems?.map((item: TcartItem, index: number) => (
        <View key={index}>
          <CheckOutItem
            handleIncreaseQuantity={() => increaseItemQuantity(item._id)}
            handleReduceQuantity={() => decreaseItemQuantity(item._id)}
            total={item.total as number}
            name={item.name}
            quantity={item.quantity}
            image={item.image}
          />
        </View>
      ))}
      <CheckoutButton />
    </View>
  );
};

function AllCartsGrid({ vendors }: { vendors: any }) {
  const navigation = useNavigation();
  console.info(vendors[0]);
  return (
    <View>
      {/* <View className=" pb-4 justify-center flex flex-row">
        <Ionicons style={{ alignSelf: "flex-start" }} name="chevron-back" />
        <Text className="text-dark text-center text-4xl font-semibold">
          Carts
        </Text>
      </View> */}
      <View className="">
        {vendors?.map((vendor: Ivendor, index: number) => (
          <VendorCard key={index} vendor={vendor} />
        ))}
      </View>
    </View>
  );
}

const AllCarts = ({ navigation }) => {
  const { cartItems, decreaseItemQuantity, increaseItemQuantity, vendors } =
    useCartStore();

  const emptyCart = useMemo(() => {
    if (cartItems.length < 1) {
      return true;
    } else return false;
  }, [cartItems]);

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="flex flex-row items-center mb-6">
        <Text className="font-semibold ml-4 text-dark text-4xl text-center">
          Carts
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
          paddingHorizontal: 8,
        }}
      >
        {!emptyCart ? (
          <AllCartsGrid vendors={vendors} />
        ) : (
          <EmptyState
            secondaryText="Add items to your cart to see them here"
            description="Your cart is empty"
          />
        )}
      </ScrollView>
      {/* <CheckoutButton /> */}
    </SafeAreaView>
  );
};

export const Cart = (props: Props) => {
  const { cartItems, decreaseItemQuantity, increaseItemQuantity, vendors } =
    useCartStore();

  const emptyCart = useMemo(() => {
    if (cartItems.length < 1) {
      return true;
    } else return false;
  }, [cartItems]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Carts",
        }}
        name="AllCarts"
        component={AllCarts}
      />
      <Stack.Screen
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: Colors.gray,
          },
        }}
        name="ViewCart"
        component={InnerCart}
      />
    </Stack.Navigator>
  );
};
