import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StorePreviewCard } from "../cards";

interface IStore {
  store_name: string;
  store_address: string;
  store_description: string;
  store_logo: string;
  store_image: string;
  store_menu: string;
  store_rating: number;
  _id: string;
}

type Props = {
  store: IStore;
};

function RestaurantCard({ store }: Props) {
  const navigation = useNavigation();

  const { width: phoneWidth } = useWindowDimensions();

  const cardWidth = phoneWidth * 0.85;

  return (
    <TouchableOpacity
      onPress={() =>
        // @ts-ignore
        navigation.navigate("Restaurant", {
          name: store.store_name,
          store_id: store._id,
          store_image: store.store_image,
        })
      }
      className="   mr-4    flex justify-between"
    >
      <View className=" relative ">
        <Image
          resizeMode="cover"
          style={{
            width: cardWidth,
            height: 200,
          }}
          className="rounded-lg"
          source={{ uri: store.store_image }}
        />
        {/* LIKE BUTTON */}
        <View className="absolute right-2 top-2">
          <Feather color={"white"} size={28} name="heart" />
        </View>
        {/* OVERLAY */}
        <View className="absolute top-0 right-0 left-0 bottom-0 bg-black/10 rounded-lg "></View>
      </View>
      <View className="h-20  p-2 ">
        <View className="flex flex-row justify-between">
          <Text className="text-dark font-semibold text-[18px]">
            {store.store_name}
          </Text>
          <View className="bg-primary h-10 w-10 rounded-full items-center justify-center">
            <Text className="font-medium text-[15px]">4.6</Text>
          </View>
        </View>
        <Text>1.9km Away</Text>
      </View>
    </TouchableOpacity>
  );
}

export const RestaurantsGrid = ({
  title,
  stores,
}: {
  title: string;
  stores: IStore[];
}) => {
  return (
    <>
      <Text className="text-xl font-bold text-dark">{title}</Text>
      <ScrollView horizontal className="py-2">
        {stores?.map((store, index) => {
          return <StorePreviewCard key={index} store={store} />;
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});
