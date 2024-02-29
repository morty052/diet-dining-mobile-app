import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { useState, useMemo, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import HorizontalRule from "../../components/ui/HorizontalRule";
import ItemInfo from "./components/ItemInfo";
import ExtraSelectionsGrid from "./components/ExtraSelectionsGrid";
import FrequentlyBought from "./components/FrequentlyBought";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}

type Props = {};

// const menu = [
//   {
//     name: "Deserts",
//     image: desserts,
//     price: 200,
//     _id: "1",
//   },
//   {
//     name: "Lean meat",
//     image: desserts,
//     price: 200,
//     _id: "2",
//   },
//   {
//     name: "Salads",
//     image: desserts,
//     price: 200,
//     _id: "3",
//   },
//   {
//     name: "Diet foods",
//     image: desserts,
//     price: 200,
//     _id: "4",
//   },
//   {
//     name: "Smoothies",
//     image: desserts,
//     price: 200,
//     _id: "5",
//   },
//   {
//     name: "Soups",
//     image: desserts,
//     price: 200,
//     _id: "6",
//   },
//   {
//     name: "Specials",
//     image: desserts,
//     price: 200,
//     _id: "7",
//   },
//   {
//     name: "Parfaits",
//     image: desserts,
//     price: 200,
//     _id: "8",
//   },
// ];
const BackButtonheader = ({ _id, name }: { _id: string; name: string }) => {
  const navigation = useNavigation();
  return (
    <View className="px-4 pt-2 flex flex-row justify-between items-center">
      <TouchableOpacity className="w-20" onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          // @ts-ignore
          navigation.navigate("MealBreakDown", {
            _id,
            name,
          })
        }
        className="px-4 py-2 rounded-full bg-primary flex-row items-center space-x-2"
      >
        <Text className="text-white text-xs">Nutritional Value</Text>
        <FontAwesome color="white" size={10} name="arrow-right" />
      </TouchableOpacity>
    </View>
  );
};

const RatingStar = ({
  handleRating,
  rating,
  score,
  size,
}: {
  handleRating: (value: number) => void;
  rating: number;
  size: number;
  score: number;
}) => {
  const isActive = score <= rating;

  return (
    <TouchableOpacity className="mr-4" onPress={() => handleRating(score)}>
      {!isActive ? (
        <AntDesign name="staro" size={size} color="black" />
      ) : (
        <AntDesign name="star" size={size + 5} color="gold" />
      )}
    </TouchableOpacity>
  );
};

const Ratingsmodal = ({ modalVisible, setModalVisible, rating }: any) => {
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        className="py-4 px-2"
      >
        <AntDesign name="closecircleo" size={30} color="black" />
      </TouchableOpacity>
      <View className="flex  flex-1  pt-4 px-2">
        <View className=" bg-white flex-1 pb-20 justify-center items-center px-6">
          <Text className="text-xl">Rate this meal {rating} stars ? </Text>
          <View className="flex-row py-4">
            {[1, 2, 3, 4, 5].map((rating, i) => (
              <RatingStar
                size={40}
                score={i + 1}
                rating={0}
                key={i}
                handleRating={(i) => handleRating(i)}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className=" inline-flexs w-full border py-4 mt-6 rounded-lg bg-dark px-4 justify-center items-center"
          >
            <Text className=" text-white text-xl font-medium">
              Confirm Rating
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ServingsDisplay = ({
  setItemQuantity,
  itemQuantity,
}: {
  setItemQuantity: any;
  itemQuantity: number;
}) => {
  return (
    <View className="max-w-sm  mx-auto">
      {/* <Text className="text-2xl font-semibold text-dark">Servings</Text> */}
      <View className="flex-row items-center space-x-6 ">
        <TouchableOpacity
          onPress={() =>
            itemQuantity <= 1
              ? setItemQuantity(1)
              : setItemQuantity((prev: number) => prev - 1)
          }
        >
          <Ionicons size={35} name="remove-circle-outline" />
        </TouchableOpacity>
        <Text className="text-[24px]  font-semibold text-dark">
          {itemQuantity}
        </Text>
        <TouchableOpacity
          onPress={() => setItemQuantity((prev: number) => prev + 1)}
        >
          <Ionicons name="add-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BuyButton = ({
  buyItem,
  itemQuantity,
  setItemQuantity,
  price,
}: {
  buyItem: () => void;
  itemQuantity: number;
  setItemQuantity: any;
  price: number;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(-1);

  return (
    <SafeAreaView
      edges={{
        bottom: "additive",
        top: "off",
      }}
      className="absolute bottom-0 flex items-center  left-0 right-0 gap-4 pb-4 pt-2  bg-white border-gray-300 px-4 border-t "
    >
      <ServingsDisplay
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
      />
      <TouchableOpacity
        onPress={buyItem}
        className="  w-[98%] py-4 rounded-lg bg-primary px-4 justify-center items-center"
      >
        <Text className=" text-white text-[20px] font-medium">
          Add {itemQuantity} to Cart - ${Math.round(price)}
        </Text>
      </TouchableOpacity>
      {/* <Ratingsmodal
        rating={rating}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        animationType="slide"
      /> */}
    </SafeAreaView>
  );
};

export const FoodScreen = ({ navigation, route }) => {
  const [viewingNutritionalValue, setViewingNutritionalValue] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [rating, setRating] = useState(3);
  const { addToCart } = useCartStore();
  const { _id } = route.params;
  const [loading, setloading] = useState(true);
  const [product, setProduct] = useState<null | any>(null);

  function handleRating(rating: number) {
    console.info(rating);
    setRating(rating);
    // setModalVisible(true);
  }

  async function fetchProduct() {
    const res = await fetch(
      // `http://localhost:3000/stores/get-single-product?product_id=${_id}`
      `https://diet-dining-server.onrender.com/stores/get-single-product?product_id=${_id}`
    );
    const data = await res.json();
    setProduct(data);
    setloading(false);
    return data;
  }

  useEffect(() => {
    fetchProduct();
  }, [_id]);

  if (loading) {
    return null;
  }

  const { image, name, price, description, vendor } = product ?? {};

  return (
    <SafeAreaView className="flex-1 bg-white    ">
      <BackButtonheader name={name} _id={_id} />
      <ScrollView className="">
        <View className="flex-1  pb-40  relative ">
          <ItemInfo
            description={description as string}
            image={image as string}
            name={name as string}
            price={price as number}
          />
          <HorizontalRule marginTop={10} marginBottom={20} />
          <ExtraSelectionsGrid />
          <HorizontalRule marginTop={10} marginBottom={20} />
          <FrequentlyBought />
        </View>
      </ScrollView>
      <BuyButton
        price={
          itemQuantity > 1
            ? ((price && itemQuantity * price) as number)
            : (price as number)
        }
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
        buyItem={() =>
          addToCart({
            ...(product as TcartItem),
            quantity: itemQuantity,
          })
        }
      />
    </SafeAreaView>
  );
};
