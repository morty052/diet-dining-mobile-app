import { ImageSourcePropType } from "react-native";

export type TcartItem = {
  price: number;
  name: string;
  _id: string;
  quantity: number;
  total?: number;
  image?: ImageSourcePropType;
  vendor: {
    store_name: string;
    store_image: string;
  };
};
