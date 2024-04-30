import React from "react";
import { getItem } from "../utils/storage";

type UserDetails = {
  firstName: string;
  lastName: string;
  user_email: string;
  user_phone: string;
  user_password: string;
  user_id: string;
  user_address: string;
};

export function useUserDetails() {
  const details = getItem("user_details");
  const user_details: UserDetails = React.useMemo(
    () => JSON.parse(details as string),
    [details]
  );

  const {
    firstName,
    lastName,
    user_email,
    user_phone,
    user_address,
    user_id,
    user_password,
  } = user_details ?? {};

  return {
    firstName,
    lastName,
    user_email,
    user_phone,
    user_address,
    user_id,
    user_password,
  };
}
