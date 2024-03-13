import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

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

const ViewCartButton = ({ itemQuantity }: { itemQuantity: number }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={
        {
          // width: "95%",
        }
      }
    >
      <View
        style={{
          height: 60,
          paddingHorizontal: 16,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          borderColor: Colors.dark,
          borderWidth: 1,
          position: "relative",
        }}
        className=" text-white text-[20px] font-medium"
      >
        <Ionicons size={30} name="cart-outline" />
      </View>
    </TouchableOpacity>
  );
};

const BuyButton = ({
  buyItem,
  itemQuantity,
  setItemQuantity,
  price,
  isInCart,
}: {
  buyItem: () => void;
  itemQuantity: number;
  setItemQuantity: any;
  price: number;
  isInCart: boolean;
}) => {
  return (
    <SafeAreaView
      edges={{
        bottom: "additive",
        top: "off",
      }}
      className="absolute bottom-0 flex items-center  left-0 right-0 gap-4 pb-4 pt-2  bg-white border-gray-300 px-2 border-t "
    >
      <ServingsDisplay
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        {isInCart && <ViewCartButton itemQuantity={itemQuantity} />}
        <TouchableOpacity
          style={{
            height: 60,
            paddingHorizontal: 16,
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            // width: "95%",
            flex: 1,
          }}
          onPress={buyItem}
        >
          <Text className=" text-white text-[20px] font-medium">
            {` Add ${itemQuantity} to Cart - $${Math.round(price)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BuyButton;
