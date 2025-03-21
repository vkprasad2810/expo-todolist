import { Text } from "react-native";
import { Navigator, Redirect, Slot, Stack } from "expo-router";
import { Children } from "react";
import { useAuth } from "@/context/auth-context";

export default function AppLayout({ children }: any) {
  const { user } = useAuth();

  // You can keep the splash screen open, or render a loading screen like we do here.
  //   if (session) {
  //     return <Text>Loading...</Text>;
  //   }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  console.log(user);

  // This layout can be deferred because it's not the root layout.
  return <Stack screenOptions={{ headerShown: false }} />;
}
