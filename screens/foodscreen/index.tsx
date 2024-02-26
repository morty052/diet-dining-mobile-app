import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { useState, useMemo, useEffect } from "react";
import { menu } from "../../constants/menu";
import { StatusBar } from "expo-status-bar";
import { useCartStore } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { useFocusEffect } from "@react-navigation/native";

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
const BackButtonheader = ({
  setNutritionalValue,
}: {
  setNutritionalValue: any;
}) => {
  const navigation = useNavigation();
  return (
    <View className="px-4 flex flex-row justify-between items-center">
      <TouchableOpacity className="w-20" onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setNutritionalValue(true)}
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
      <View className="flex-row items-center space-x-8 ">
        <TouchableOpacity
          onPress={() =>
            itemQuantity <= 1
              ? setItemQuantity(1)
              : setItemQuantity((prev: number) => prev - 1)
          }
        >
          <AntDesign size={30} name="minuscircleo" />
        </TouchableOpacity>
        <Text className="text-3xl  font-semibold text-dark">
          {itemQuantity}
        </Text>
        <TouchableOpacity
          onPress={() => setItemQuantity((prev: number) => prev + 1)}
        >
          <AntDesign name="pluscircleo" size={30} color="black" />
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
    <View className="absolute bottom-0 flex items-center  left-0 right-0 gap-4 pb-8 pt-2  bg-white border-gray-300 px-4 border-t ">
      <ServingsDisplay
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
      />
      <TouchableOpacity
        onPress={buyItem}
        className="  w-[90%] py-4 rounded-lg bg-primary px-4 justify-center items-center"
      >
        <Text className=" text-white text-[20px] font-medium">
          Add {itemQuantity} to Cart - ${price}
        </Text>
      </TouchableOpacity>
      <Ratingsmodal
        rating={rating}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        animationType="slide"
      />
    </View>
  );
};

const ItemInfo = ({
  price,
  name,
  image,
  description,
}: {
  price: number;
  name: string;
  image: any;
  description: string;
}) => {
  return (
    <>
      <Image
        resizeMode="contain"
        className="w-full h-72  mx-auto "
        source={{ uri: image }}
      />
      <View className="">
        <Text className="text-[24px] font-medium text-dark">{name}</Text>
        <View className="flex flex-row gap-2">
          <Text>Vegetarian</Text>
          <Text>Halal</Text>
        </View>
        <View className="flex flex-row gap-2 py-1">
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star" />
          <Ionicons color={Colors.primary} size={20} name="star-outline" />
        </View>
        <Text className=" text-[17px] my-4 font-medium text-dark mt-1">
          {description}
        </Text>
      </View>
    </>
  );
};

const NutritionalValue = ({
  viewingNutritionalValue,
  setNutritionalValue,
  name,
}: {
  name: string;
  viewingNutritionalValue: boolean;
  setNutritionalValue: any;
}) => {
  const BackButtonheader = () => {
    return (
      <View className="px-4 border-b pb-4 border-gray-200 ">
        <Pressable
          className=" flex flex-row justify-between items-center"
          onPress={() => setNutritionalValue(false)}
        >
          <View className="border h-8 w-8 rounded-full flex justify-center items-center">
            <FontAwesome size={20} color="black" name="close" />
          </View>
          <View className=" flex-1">
            <Text className="text-lg text-right font-medium ">{name}</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={viewingNutritionalValue}
        className=" relative"
      >
        <SafeAreaView>
          <BackButtonheader />
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-medium text-dark">
              Nutritional Information
            </Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Kcal /100 g</Text>
            <Text className="text-lg font-medium text-dark">483.33 kcal</Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">
              Protein /100 g
            </Text>
            <Text className="text-lg font-medium text-dark">9.29 g</Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Carbs /100 g</Text>
            <Text className="text-lg font-medium text-dark">9.29 g</Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Fat /100 g</Text>
            <Text className="text-lg font-medium text-dark">9.29 g</Text>
          </View>

          <View className="px-4 py-6 border-b border-gray-200">
            <Text className="text-lg font-medium text-dark">
              Additional Information
            </Text>
          </View>

          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Sugar</Text>
            <Text className="text-lg font-medium text-dark">483.33 g</Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Lettuce</Text>
            <Text className="text-lg font-medium text-dark">9.29 g</Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Mandarin Oil</Text>
            <Text className="text-lg font-medium text-dark">9.29 g</Text>
          </View>
          <View className="p-4 border-b border-gray-200 flex-row justify-between">
            <Text className="text-lg font-medium text-dark">Black Pepper</Text>
            <Text className="text-lg font-medium text-dark">9.29 g</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const NutritionalGrid = () => {
  const { width } = useWindowDimensions();

  const boxWidth = width * 0.3;

  function NutritionBox({}) {
    return (
      <View
        style={{ width: boxWidth }}
        className="border-2 border-primary items-center flex p-2 "
      >
        <View className="gap-1">
          <Text className="text-[18px] font-medium text-dark text-center">
            126g
          </Text>
          <Text>Calorie</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex flex-row flex-wrap">
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
      <NutritionBox />
    </View>
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

  console.log(product);
  const { image, name, price, description, vendor } = product ?? {};

  return (
    <SafeAreaView className="flex-1    ">
      <BackButtonheader setNutritionalValue={setViewingNutritionalValue} />
      <ScrollView className="">
        <View className="flex-1  pb-40  relative ">
          {!loading && (
            <View className="px-4 ">
              <ItemInfo
                description={description as string}
                image={image as string}
                name={name as string}
                price={price as number}
              />
              <NutritionalGrid />
            </View>
          )}
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
