import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getValueFor } from "../../lib/secure-store";
import Colors from "../../constants/colors";
type Props = {};

const LikeButton = ({
  background,
  item_id,
}: {
  background?: boolean;
  item_id: string;
}) => {
  const [liked, setLiked] = React.useState(false);
  const [newLike, setNewLike] = React.useState(false);

  async function handleLikeItem() {
    if (newLike) {
      setNewLike(false);
      return;
    }

    try {
      setNewLike(true);
      const user_id = await getValueFor("user_id");
      const url = `https://diet-dining-server.onrender.com/user/like?user_id=${user_id}&item_id=${item_id}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.info(error);
    }
  }

  return (
    <Pressable
      style={background ? styles.container : null}
      onPress={() => handleLikeItem()}
    >
      <Ionicons
        color={Colors.primary}
        size={background ? 20 : 30}
        name={liked || newLike ? "heart" : "heart-outline"}
      />
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingTop: 4,
  },
});
