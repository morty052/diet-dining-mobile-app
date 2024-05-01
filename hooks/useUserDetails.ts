import React from "react";
import { getItem, setItem } from "../utils/storage";

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

  const updateDetails = (key: keyof UserDetails, value: string) => ({
    ...user_details,
    [key]: value,
  });

  const setUserDetails = (key: keyof UserDetails, value: string) => {
    setItem("user_details", JSON.stringify(updateDetails(key, value)));
  };
  const SetUserDetails = ({ details }: { details: Partial<UserDetails> }) => {
    const newDetailsPlaceholder = [];

    // * FILTER OUT NULL VALUES
    for (const key in details) {
      if (!details[key as keyof UserDetails]) {
        continue;
      }

      newDetailsPlaceholder.push({
        [key]: details[key as keyof UserDetails],
      });
    }

    const newDetails = {
      ...user_details,
      ...newDetailsPlaceholder,
    };
    console.log("newDetails", newDetails);
    setItem("user_details", JSON.stringify(newDetails));
  };

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
    setUserDetails,
    SetUserDetails,
  };
}
