import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SEMI_BOLD } from "../../../constants/fontNames";
import Colors from "../../../constants/colors";
import { FlatList } from "react-native-gesture-handler";

type Props = {};

const data = [
  {
    name: "Diet Coke",
    price: 20,
    image:
      "https://th.bing.com/th/id/OIP.AE9kv1O1fUFqTD5Vx3GK3QHaLS?rs=1&pid=ImgDetMain",
  },
  {
    name: "Diet Coke",
    price: 20,
    image:
      "https://th.bing.com/th/id/OIP.AE9kv1O1fUFqTD5Vx3GK3QHaLS?rs=1&pid=ImgDetMain",
  },
  {
    name: "Diet Coke",
    price: 20,
    image:
      "https://th.bing.com/th/id/OIP.AE9kv1O1fUFqTD5Vx3GK3QHaLS?rs=1&pid=ImgDetMain",
  },
  {
    name: "Diet Coke",
    price: 20,
    image:
      "https://th.bing.com/th/id/OIP.AE9kv1O1fUFqTD5Vx3GK3QHaLS?rs=1&pid=ImgDetMain",
  },
];

const AddOnItem = ({ name, price, image }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: SEMI_BOLD, fontSize: 16, color: Colors.dark }}
        >
          {name}
        </Text>
        <Text
          style={{ fontFamily: SEMI_BOLD, fontSize: 16, color: Colors.dark }}
        >
          ${price}
        </Text>
      </View>
      <Image
        resizeMode="cover"
        style={{ height: 100, width: 100 }}
        source={{ uri: image }}
      />
    </View>
  );
};

const FrequentlyBought = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.frequentlyBoughtText}>
        Frequently bought together
      </Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => (
          <AddOnItem image={item.image} price={item.price} name={item.name} />
        )}
      />
    </View>
  );
};

export default FrequentlyBought;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  frequentlyBoughtText: {
    fontFamily: SEMI_BOLD,
    fontSize: 24,
    color: Colors.dark,
    marginBottom: 20,
  },
});
