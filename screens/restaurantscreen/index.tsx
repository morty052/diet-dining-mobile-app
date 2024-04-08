import {
  ImageBackground,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorState, Screen } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StoreMenuSectionList, StoreTags } from "./components";
import LikeButton from "../../components/interaction-buttons/LikeButton";
import { get_single_store } from "../../lib/supabase";
import { RestaurantSkeleton } from "../../components/ui/SkeletonBase";
import TstoreProps from "../../types/Store";
import { Ivendor, useCartStore } from "../../store/cartStore";
import BuyButton from "../foodscreen/components/BuyButton";
import Basketbutton from "./components/BasketButton";
import HorizontalRule from "../../components/ui/HorizontalRule";
import { SEMI_BOLD } from "../../constants/fontNames";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Header = ({
  isVisible,
  setSearching,
  store_name,
  filters,
  store_id,
}: {
  isVisible: boolean;
  setSearching: (b: boolean) => void;
  store_name: string;
  store_id: string;
  filters?: { title: string }[];
}) => {
  const navigation = useNavigation();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: !isVisible
        ? "transparent"
        : withTiming("white", { duration: 100 }),
    };
  });

  return (
    <>
      <AnimatedSafeAreaView
        style={animatedStyles}
        edges={{
          bottom: "off",
          top: "additive",
        }}
        className={`z-10 absolute left-0 right-0 `}
      >
        <View className="flex px-2 py-4 flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity
              className="h-8 w-8 flex justify-center items-center  bg-white rounded-full"
              onPress={() => navigation.goBack()}
            >
              <Ionicons size={20} name="arrow-back" color={Colors.primary} />
            </TouchableOpacity>
            {isVisible && <Text>{store_name}</Text>}
          </View>
          <View className="flex-row gap-2 items-center">
            {/* <TouchableOpacity
              className="h-8 w-8 flex justify-center items-center  bg-white rounded-full"
              onPress={() => setSearching(true)}
            >
              <Ionicons size={20} name="star-outline" color={Colors.primary} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity className="h-8 w-8 flex justify-center items-center  bg-white rounded-full">
              <Ionicons size={20} name="heart-outline" color={Colors.primary} />
            </TouchableOpacity> */}
            <LikeButton item_id={store_id} background />
          </View>
        </View>
        {/* {isVisible && filters.length > 1 && <QuickFilters filters={filters} />} */}
      </AnimatedSafeAreaView>
    </>
  );
};

const MerchantStoryGrid = ({
  store,
  data,
}: {
  store: TstoreProps;
  data: any;
}) => {
  const StoryCard = ({ image, index }: { image: string; index: number }) => {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() =>
          // @ts-ignore
          navigation.navigate("MerchantStory", {
            startingIndex: index,
          })
        }
        style={{ gap: 10, marginRight: 20 }}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            resizeMode="cover"
            style={{ width: 80, height: 80, borderRadius: 80 }}
            source={{ uri: image }}
          />
          {/* OVERLAY */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: "black",
              borderRadius: 80,
              opacity: 0.1,
            }}
          ></View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10, gap: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD }}>Stories</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <StoryCard index={index} image={item.image} />
        )}
      />
    </View>
  );
};

const RestaurantScreen = ({ navigation, route }: any) => {
  const { store_id, store_name } = route.params;
  const [isViewable, setisViewable] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<null | TstoreProps>(null);
  const [vendorsChoice, setVendorsChoice] = useState(null);

  const { getVendor, cartItems } = useCartStore();

  const activeVendor: Ivendor | undefined = useMemo(() => {
    const vendor = getVendor(store_name);

    return vendor;
  }, [store_name, cartItems]);

  const fetchStore = async () => {
    // const res = await fetch(
    //   `http://localhost:3000/stores/get-single?store_id=${store_id}`
    //   // `https://diet-dining-server.onrender.com/stores/get-single?store_id=${store_id}`
    //   // `https://e48d-102-216-10-2.ngrok-free.app/stores/get-single?store_id=${store_id}`
    // );
    // const data = await res.json();
    // console.log(data);
    // return data[0];

    const data = await get_single_store(store_id);
    setStore(data[0]);
    setLoading(false);
    return data[0];
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchStore = async () => {
        // const res = await fetch(
        //   `http://localhost:3000/stores/get-single?store_id=${store_id}`
        //   // `https://diet-dining-server.onrender.com/stores/get-single?store_id=${store_id}`
        //   // `https://e48d-102-216-10-2.ngrok-free.app/stores/get-single?store_id=${store_id}`
        // );
        // const data = await res.json();
        // console.log(data);
        // return data[0];

        const data = await get_single_store(store_id);
        setStore(data[0]);
        setVendorsChoice(data[0].menu[0].products);
        setLoading(false);
        return data[0];
      };

      fetchStore();

      // return () => {
      //   setStore(null);
      // };
    }, [store_id])
  );

  // const {
  //   data: store,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["active store"],
  //   queryFn: fetchStore,
  // });

  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 200) {
      setisViewable(true);
    } else if (e.nativeEvent.contentOffset.y < 200) {
      setisViewable(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <ScrollView ref={scrollRef}>
          <RestaurantSkeleton />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // if (isError) {
  //   return <ErrorState />;
  // }

  // if (!store) {
  //   return (
  //     <SafeAreaView>
  //       <ScrollView ref={scrollRef}>
  //         <RestaurantSkeleton />
  //       </ScrollView>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View style={activeVendor && { paddingBottom: 120 }}>
      <Header
        store_id={store_id}
        setSearching={setSearching}
        isVisible={isViewable}
        store_name={store_name}
      />
      <ScrollView
        className="bg-white relative "
        onScroll={(e) => handleScroll(e)}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <ImageBackground
          style={[{ height: 300 }]}
          source={{ uri: store?.store_image }}
        />
        <View className={` bg-white`}>
          <StoreTags
            store_tags={store?.store_tags as string[]}
            store_address={store?.store_address}
            store_id={store_id}
            store_name={store_name}
          />
          <HorizontalRule marginTop={20} />
          <MerchantStoryGrid
            data={vendorsChoice}
            store={store as TstoreProps}
          />
          <HorizontalRule marginTop={20} />
          <View>
            <StoreMenuSectionList data={store?.menu} />
          </View>
        </View>
      </ScrollView>
      {activeVendor && (
        <Basketbutton
          store_id={activeVendor._id}
          store_name={activeVendor.store_name}
          vendorTotal={activeVendor.vendorTotal}
          vendorItemsCount={activeVendor.vendorItemsCount}
        />
      )}
      {/* <StoreSearchModal setSearching={setSearching} searching={searching} /> */}
    </View>
  );
};

function StoreSearchModal({
  searching,
  setSearching,
}: {
  searching: boolean;
  setSearching: any;
}) {
  const [query, setQuery] = useState("");

  return (
    <Modal animationType="slide" visible={searching}>
      <View className="flex-1 pt-14 bg-white px-2 ">
        <View className="flex border rounded-lg flex-row items-center">
          <Ionicons
            size={25}
            onPress={() => setSearching(false)}
            name="arrow-back"
          />
          <TextInput autoFocus className="flex-1 py-2 ml-4" />
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  container: "py-4 px-2 flex-1 ",
  store_name_text: "font-semibold text-[35px]",
  tags_container: "flex flex-row items-center gap-1 flex-wrap pt-1 pr-4",
};

export default RestaurantScreen;
