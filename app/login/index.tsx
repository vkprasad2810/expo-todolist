import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { config, useAuth } from "@/context/auth-context";
import * as Google from "expo-auth-session/providers/google";

export default function Login() {
  const router = useRouter();
  const handleDismiss = () => {
    router.dismiss(); // Dismiss the current screen
    router.push("/login");
  };

  const { login } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleSignIn = () => {
    console.log("error - " + response?.type);

    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("access token : " + token);
      login();
      // const auth = getAuth();
      // const credential = GoogleAuthProvider.credential(id_token);
      // signInWithCredential(auth, credential);
    }
  };

  useEffect(() => {
    handleSignIn();
  }, [response]);

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#171820" }}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Login",
          headerBackVisible: true,
        }}
      />

      <Image
        contentFit="contain"
        source={require("../../assets/images/favicon.png")}
        style={{ flex: 1 }}
      />

      <View
        style={{
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            contentFit="contain"
            source={require("../../assets/images/logo1.png")}
            style={{ width: 22, height: 22 }}
          />
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Todox
          </Text>
        </View>

        <Text
          style={{
            alignItems: "center",
            color: "white",
            justifyContent: "center",
            textAlign: "center",
            padding: 20,
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          {"Your tasks, your way\nlog in and get things done!"}
        </Text>

        <Pressable
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            flexDirection: "row",
            gap: 12,
          }}
          onPress={() => {
            promptAsync();
            console.log("click");
          }}
        >
          <Image
            contentFit="contain"
            source={require("../../assets/images/google.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ color: "#841584", fontSize: 16 }}>
            Continue with Google
          </Text>
        </Pressable>

        <Text
          style={{
            marginBlock: 30,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "400",
            color: "white",
            fontSize: 18,
          }}
        >
          Register an new{" "}
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "400",

              fontSize: 18,
              color: "#4b6bb4",
            }}
          >
            Account
          </Text>
        </Text>
      </View>

      {/* <Pressable onPress={handleDismiss}>
        <Text>login smdn ksdj ksd bcsvkjd cjsdjc jsdbjc sdkcjkjdbs </Text>
      </Pressable> */}
    </View>
  );
}
