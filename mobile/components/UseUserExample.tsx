import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text } from "react-native";

export default function UseUserExample() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <Text>Hello, {user.firstName} welcome to Clerk</Text>;
}
