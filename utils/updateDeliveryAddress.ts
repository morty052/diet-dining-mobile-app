import { baseUrl } from "../constants/baseUrl";
import { setItem } from "./storage";

export async function updateDeliveryAddress({
  delivery_address,
  user_id,
}: {
  delivery_address: string;
  user_id: string;
}) {
  setItem("DELIVERY_ADDRESS", delivery_address);

  const res = await fetch(`${baseUrl}/user/update-delivery-address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      delivery_address,
      user_id,
    }),
  });

  const data = await res.json();

  return data;
}
