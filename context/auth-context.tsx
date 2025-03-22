import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";
import * as WebBrowser from "expo-web-browser";

const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;
const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();
// const EXPO_REDIRECT_PARAMS = {
//   useProxy: true,
//   projectNameForProxy: `@username/todolist`,
// };

// const NATIVE_REDIRECT_PARAMS = { native: "todolist://" };

const config = {
  webClientId,
  iosClientId,
  androidClientId,
};

// // initializeApp(firebaseConfig);

// // export default function App() {
// const [request, response, promptAsync] = Google.useAuthRequest(config);

// const handleSignIn = () => {
//   if (response?.type === "success") {
//     const { authentication } = response;

//     const token = authentication?.accessToken;

//     console.log("access token : " + token);

//     // const auth = getAuth();
//     // const credential = GoogleAuthProvider.credential(id_token);
//     // signInWithCredential(auth, credential);
//   }
// };

// useEffect(() => {
//   handleSignIn();
// }, [response]);

const AuthContext = createContext<{ user: string | null; login: () => void }>({
  user: null,
  login: () => null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const router = useRouter();

  const login = () => {
    setUser("prasad");

    console.log("hello");

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

export { useAuth, AuthProvider, config };
