import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ImageSourcePropType,
  ScrollView,
} from "react-native";
import { DishPreviewCard } from "../dishpreviewcard";
import { TcartItem } from "../../contexts/CartContext";

export type TcategoryItem = {
  price: number;
  name: string;
  _id: string;
  image?: ImageSourcePropType;
};

export function FoodCategoryGrid({
  cartItems,
  addToCart,
  category,
  title,
  style,
}: {
  cartItems: TcartItem[];
  addToCart: any;
  category: TcategoryItem[];
  title: string;
  style?: string;
}) {
  const navigation = useNavigation();

  const navigationParams = {
    activeCategory: title == "Sea food" ? "SeaFoods" : title,
  };

  return (
    <View className="pb-8">
      <View className="mb-4 flex justify-between items-center flex-row">
        <Text className="text-xl font-bold text-dark">{title}</Text>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate("FoodMenu", navigationParams)}
        >
          <Text className="text-sm font-medium">See More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        className={style}
        horizontal
        data={category}
        renderItem={({ item }: { item: TcategoryItem }) => (
          <DishPreviewCard
            direction={false}
            cartItems={cartItems}
            _id={item._id}
            addToCart={() => addToCart({ ...item, quantity: 1 })}
            image={item.image as ImageSourcePropType}
            title={item.name}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

export function FoodItemGrid({
  cartItems,
  addToCart,
  category,
  title,
}: {
  cartItems: TcartItem[];
  addToCart: any;
  category: TcategoryItem[];
  title: string;
}) {
  const navigation = useNavigation();

  const navigationParams = {
    activeCategory: title == "Sea food" ? "SeaFoods" : title,
  };

  return (
    <FlatList
      className="mb-40"
      data={category}
      renderItem={({ item }: { item: TcategoryItem }) => (
        <DishPreviewCard
          direction={true}
          cartItems={cartItems}
          _id={item._id}
          addToCart={() => addToCart({ ...item, quantity: 1 })}
          image={item.image as ImageSourcePropType}
          title={item.name}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  );
}
