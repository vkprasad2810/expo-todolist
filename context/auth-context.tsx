import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext<{ user: string | null; login: () => void }>({
  user: null,
  login: () => null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const router = useRouter();

  GoogleSignin.configure({
    webClientId: "autoDetect",
  });

  const login = () => {
    console.log("hello");

    setUser("Prasad");

    router.replace("/");
  };

  const contextData = { user, login };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
