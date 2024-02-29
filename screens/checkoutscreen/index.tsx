import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../../store/cartStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import checkOutimage from "../../assets/ordercomplete.png";
import paperPlane from "../../assets/lottie/paperplane.json";
import fryingPan from "../../assets/lottie/fryingpan.json";
import LottieView from "lottie-react-native";
import Colors from "../../constants/colors";
import { IOS } from "../../utils/Platform";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="pb-6 px-3">
      <View style={{ gap: 8 }} className="">
        <Text className="text-2xl font-bold text-dark">Checkout</Text>
        <View className="flex flex-row items-center">
          <Ionicons
            color={Colors.primary}
            size={18}
            name="storefront-outline"
          />
          <Text className="ml-2 font-medium text-primary">Store Name</Text>
        </View>
      </View>
    </View>
  );
};

const CheckoutButton = ({
  handleCheckout,
  total,
}: {
  handleCheckout: () => void;
  total: number;
}) => {
  const { cartItems, getCartTotal } = useCartStore();

  // const total = useMemo(() => getCartTotal(), [cartItems]);
  const cartIsEmpty = useMemo(() => cartItems.length == 0, [cartItems]);

  const navigate = useNavigation();

  return (
    <SafeAreaView
      edges={{
        top: "off",
        bottom: "additive",
      }}
      className="absolute bg-white  bottom-0 left-0 right-0 pb-2 pt-4  space-y-5 border-gray-300 px-4 border-t"
    >
      {/* <View className="flex-row items-center justify-between">
        <Text className="text-center font-medium text-2xl text-dark">
          Total:
        </Text>
        <Text className="text-center font-medium text-2xl text-dark">
          ${total}
        </Text>
      </View> */}
      <TouchableOpacity
        onPress={cartIsEmpty ? () => navigate.navigate("Home") : handleCheckout}
        className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center"
      >
        <Text className=" text-white text-xl font-medium">
          {!cartIsEmpty ? `Checkout - $${total} ` : "Continue Shopping"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const PriorityBox = ({ title }: { title: string }) => {
  return (
    <View className="flex-row border p-4 my-2 border-dark items-center space-x-2 rounded">
      <Text className="text-dark text-[17px]">{title}</Text>
    </View>
  );
};

function CheckOutCompleteScreen() {
  const BackButtonheader = () => {
    const navigation = useNavigation();
    return (
      <View className="px-2 pt-4 ">
        <Pressable
          className=" flex flex-row justify-between items-center"
          onPress={() => navigation.navigate("Home")}
        >
          {/* <View className="border h-8 w-8 rounded-full flex justify-center items-center">
          </View> */}
          <AntDesign size={30} color="black" name="closecircleo" />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView className="bg-white flex-1 h-screen relative">
        <BackButtonheader />
        <View className="pt-20">
          <Text className="text-3xl text-center font-bold text-dark">
            Thanks for your Order!
          </Text>
          <Text className="text-2xl text-center font-medium text-dark">
            Its on the way
          </Text>
        </View>
        <LottieView
          loop
          autoPlay
          source={paperPlane}
          style={{ height: 300, width: 300, alignSelf: "center" }}
        />
        <View className="absolute w-full bottom-0 -right-10">
          <Image
            resizeMode="cover"
            className="w-full h-96"
            source={checkOutimage}
          />
        </View>
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
}

function CheckoutLoading() {
  return (
    <>
      <SafeAreaView className="bg-white flex-1 h-screen relative">
        <View className="pt-20 pb-8 px-4">
          <Text className="text-3xl text-center font-bold text-dark">
            Getting your order ready
          </Text>
          <Text className="text-xl text-center font-medium text-dark">
            Give us a second while we prepare your order
          </Text>
        </View>
        <LottieView
          loop
          autoPlay
          source={fryingPan}
          style={{ height: 300, width: 300, alignSelf: "center" }}
        />
        {/* <View className="absolute w-full bottom-0 -right-10">
          <Image
            resizeMode="cover"
            className="w-full h-96"
            source={checkOutimage}
          />
        </View> */}
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
}

function DeliveryDetails() {
  return (
    <View className="  px-3">
      <Text className="text-[19px] font-bold text-dark">Delivery Details</Text>
      {/* LOCATION */}
      <View className="flex-row my-6 items-center w-full ">
        <Ionicons name="location-outline" size={20} color="#1F2937" />
        <View className="flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4">
          <View>
            <Text className=" text-[14px] font-medium text-dark">Address</Text>
            <Text className=" font-medium text-dark">200 West 74th st</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      {/* DROP OFF */}
      <View className="flex-row items-center w-full ">
        <Ionicons name="person-outline" size={20} color="#1F2937" />
        <View className="flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4">
          <View>
            <Text className=" text-[14px] font-medium text-dark">Drop off</Text>
            <Text className=" font-medium text-dark">Meet at door</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      {/* Delivery Time */}
      {/* <View className="flex-row justify-between py-6">
        <Text className="text-[16px] font-medium text-dark">Delivery Time</Text>
        <Text className="text-[16px] font-medium text-dark">10-20 Min</Text>
      </View> */}

      {/* DRIVER INSTRUCTIONS */}
      <View>
        <Text className="text-dark font-medium py-6">
          Instructions for driver
        </Text>
        <TextInput
          placeholder="Call me when you get to my apartment building"
          placeholderTextColor={Colors.dark}
          multiline
          className=" bg-gray-300/30 rounded-lg  px-2 py-4"
        />
      </View>
      {/* <PriorityBox title="Priority" />
      <PriorityBox title="Standard" />
      <PriorityBox title="Schedule" /> */}
    </View>
  );
}

function ContactInformation() {
  return (
    <View className="px-3">
      <Text className="text-[19px] font-bold text-dark">
        Contact Information
      </Text>

      {/* CONTAINER */}
      <TouchableOpacity className="rounded-lg mt-2 bg-gray-200/30 px-2 py-4 items-center flex flex-row justify-between">
        <View className="flex-1 flex flex-row items-center ">
          <View>
            <Ionicons name="person-circle-outline" size={24} />
          </View>
          <View className="flex-1 ml-2">
            <Text className="font-medium">Patrick Star</Text>
            <Text className="font-medium">+1 234 567 8910</Text>
          </View>
        </View>
        <Ionicons color={Colors.primary} name="pencil" size={24} />
      </TouchableOpacity>
    </View>
  );
}

function Summary({ total }: { total: number | undefined }) {
  const vendorTotal = Math.round((total as number) + 20);

  return (
    <View className="px-3">
      <Text className="text-[19px] font-bold text-dark">Summary</Text>

      {/* REEDEEM REWARD */}
      <View className="flex-row my-6 items-center w-full border-b border-black/10 pb-4 ">
        <Ionicons name="gift" size={20} color={Colors.primary} />
        <View className="flex-1 flex-row items-center justify-between  ml-4">
          <View>
            <Text className=" text-[14px] font-medium text-dark">
              Reedem a reward
            </Text>
            {/* <Text className=" font-medium text-dark">200 West 74th st</Text> */}
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      {/* PROMO CODE */}
      <View className="flex-row my-6 items-center w-full border-b border-black/10 pb-4 ">
        <Ionicons name="gift" size={20} color="#1F2937" />
        <View className="flex-1 flex-row items-center justify-between  ml-4">
          <View>
            <Text className=" text-[14px] font-medium text-dark">
              Use a promo code
            </Text>
            {/* <Text className=" font-medium text-dark">200 West 74th st</Text> */}
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      {/* SUBTOTAL AND CO  */}
      <View
        style={{
          gap: 12,
          paddingBottom: 25,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray,
        }}
      >
        {/* SUBTOTAL */}
        <View className="flex-row items-center w-full ">
          <View className="flex-1 flex-row items-center justify-between  ">
            <Text className=" text-[15px] font-medium text-dark">Subtotal</Text>
            <Text className=" text-[15px] font-medium text-dark">${total}</Text>
          </View>
        </View>

        {/* SERVICE FEE */}
        <View className="flex-row items-center w-full ">
          <View className="flex-1 flex-row items-center justify-between  ">
            <Text className=" text-[15px] font-medium text-dark">
              Service Fee
            </Text>
            <Text className=" text-[15px] font-medium text-dark">$5</Text>
          </View>
        </View>

        {/* DELIVERY FEE */}
        <View className="flex-row items-center w-full ">
          <View className="flex-1 flex-row items-center justify-between  ">
            <Text className=" text-[15px] font-medium text-dark">
              Delivery Fee
            </Text>
            <Text className=" text-[15px] font-medium text-dark">$15</Text>
          </View>
        </View>

        {/* REWARD STARS */}
        <View className="flex-row items-center w-full ">
          <View className="flex-1 flex-row items-center justify-between  ">
            <Text className=" text-[15px] font-medium text-primary">
              Reward Grapes
            </Text>
            <Text className=" text-[15px] font-medium text-primary">4</Text>
          </View>
        </View>
      </View>

      {/* TOTAL */}
      <View className="flex-row items-center w-full py-4 ">
        <View className="flex-1 flex-row items-center justify-between  ">
          <Text className=" text-[18px] font-bold text-dark">Total</Text>
          <Text className=" text-[18px] font-bold text-dark">
            {total && `$${vendorTotal}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

function CheckOutItem({ item, handleRemoveItem }) {
  return (
    <View
      className="flex-row justify-between items-center border-b border-black/10 pb-2"
      key={item.item_id}
    >
      <View className="flex-row space-x-4 py-4">
        <Text className="font-medium text-dark text-[18px]">
          {item.item_quantity}x
        </Text>
        <Text className="font-medium text-[18px] text-dark">
          {item.item_name}
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <Text className="font-medium text-dark">${item.item_total}</Text>
        <TouchableOpacity
          onPress={handleRemoveItem}
          className="ml-4 bg-red-500/10 rounded-full h-8 w-8  justify-center items-center"
        >
          <Ionicons color={Colors.danger} name="trash-bin" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CheckOutGrid({ vendorItems }) {
  const { removeItemFromCart } = useCartStore();

  return (
    <View className="border-t px-3 py-4 border-black/10">
      <View className="flex-row justify-between">
        <Text className="text-lg font-bold text-dark">Items</Text>
        <TouchableOpacity>
          <Text className="text-[14px] font-medium text-red-500">
            Clear all
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4">
        {vendorItems.map((item) => (
          <CheckOutItem
            handleRemoveItem={() => removeItemFromCart(item.item_id)}
            key={item._id}
            item={item}
          />
        ))}
      </View>
    </View>
  );
}

function HorizontalRule(params: type) {
  return (
    <View className="border-y h-4 bg-gray-200/20 border-black/10 my-8"></View>
  );
}

function NoteToStoreModal({
  writingNote,
  setWritingNote,
}: {
  writingNote: boolean;
  setWritingNote: (b: boolean) => void;
}) {
  return (
    <Modal transparent animationType="slide" visible={writingNote}>
      <Pressable
        onPress={() => setWritingNote(false)}
        className="flex-1 justify-end   bg-black/40"
      >
        {/* <Text onPress={() => setWritingNote(false)}>Notes here</Text> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="bg-white rounded-t-3xl pt-6 px-3"
        >
          <Text className="text-dark font-medium text-[16px]">
            Add a note to the store
          </Text>
          <Text className="mt-1 text-[12px]">
            Attach a note with your order
          </Text>

          <TextInput
            // autoFocus
            style={{ textAlignVertical: "top" }}
            inputMode="text"
            multiline
            placeholder="Please hold the onions"
            className=" border px-2 bg-gray-200/30 py-2 rounded-lg h-40 mt-6"
          />
          <Pressable className="rounded-3xl px-6 py-3 bg-primary  my-8 flex items-center">
            <Text className="text-white font-medium">Add Note</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

function ExtraInteractionButtons({
  store_id,
  store_name,
  writingNote,
  setWritingNote,
}: {
  store_id: string;
  store_name: string;
  writingNote: boolean;
  setWritingNote: (b: boolean) => void;
}) {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row justify-between items-center pt-4 px-3 ">
      <NoteToStoreModal
        setWritingNote={setWritingNote}
        writingNote={writingNote}
      />
      <TouchableOpacity
        onPress={() => setWritingNote(true)}
        className="w-32 bg-gray-100 rounded-full flex flex-row p-2 items-center justify-center"
      >
        <Ionicons size={14} name="document-text-outline" />
        <Text className="ml-1 text-[12px] font-medium text-dark">
          Note to store
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          // @ts-ignore
          navigation.navigate("Restaurant", {
            store_name,
            store_id,
          })
        }
        className="w-32 bg-gray-100 rounded-full flex flex-row p-2 items-center justify-center"
      >
        <Ionicons size={14} name="add" />
        <Text className="ml-1 text-[12px] font-medium text-dark">
          Add more items
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function CheckoutScreen({ route, navigation }) {
  const { cartItems, handleCheckout, vendors } = useCartStore();
  const [checkoutComplete, setcheckoutComplete] = useState(false);
  const [writingNote, setwritingNote] = useState(false);
  const [loading, setLoading] = useState(false);

  const { store_name, store_id } = route.params;

  console.info(store_name);

  const activeVendor = useMemo(
    () => vendors.find((vendor) => vendor.store_name == store_name),
    []
  );

  const { vendorItems, vendorTotal, vendorItemsCount } = activeVendor ?? {};

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setcheckoutComplete(true);
      }, 8000);
    }
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: store_name,
      headerShown: true,
      headerShadowVisible: false,
    });
  }, []);

  return (
    <>
      {!checkoutComplete && !loading && (
        <View className="flex-1  bg-white">
          <ScrollView className="relative pt-6 ">
            <Header />
            <View className="pb-32">
              <CheckOutGrid vendorItems={vendorItems} />
              <ExtraInteractionButtons
                store_id={store_id}
                store_name={store_name}
                writingNote={writingNote}
                setWritingNote={setwritingNote}
              />
              <HorizontalRule />
              <DeliveryDetails />
              <HorizontalRule />
              <ContactInformation />
              <HorizontalRule />
              <Summary total={vendorTotal} />
            </View>
          </ScrollView>
          <CheckoutButton
            total={Math.round((vendorTotal as number) + 20)}
            handleCheckout={() => {
              setLoading(true);
              handleCheckout(store_name);
            }}
          />
        </View>
      )}
      {checkoutComplete && <CheckOutCompleteScreen />}
      {loading && <CheckoutLoading />}
    </>
  );
}
