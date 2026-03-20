import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import API from "../api/api";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        await API.get("/user/me");
        router.replace("/(tabs)/home");
      } catch (error) {
        // Not logged in → check onboarding
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
        console.log("HAS ONBOARDED:", hasOnboarded);

        if (hasOnboarded) {
          router.replace("/auth/login");
        } else {
          router.replace("/splash-one"); // your first onboarding screen
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
