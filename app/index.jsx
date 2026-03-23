import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../api/api";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function Index() {
  const router = useRouter();
  const [hasOnboarded, setHasOnboarded] = useState(null); // null = loading

  useEffect(() => {
    const init = async () => {
      try {
        const value = await AsyncStorage.getItem("hasOnboarded");
        const onboarded = value === "true"; // ensure boolean
        setHasOnboarded(onboarded);

        if (onboarded) {
          // Returning user → auto go to login
          setTimeout(() => {
            try {
              API.get("/user/me");
              router.replace("/(tabs)/home");
            } catch {
              router.replace("/auth/login");
            }
          }, 2000); // 2s splash
        }
      } catch (err) {
        console.error("Error reading AsyncStorage:", err);
        setHasOnboarded(false); // fallback → first-time
      }
    };
    init();
  }, []);

  // Show loader while AsyncStorage is reading
  if (hasOnboarded === null) {
    return (
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/splash-image.png")}
            style={styles.logo}
          />
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // First-time users → logo + button
  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/splash-image.png")}
          style={styles.logo}
        />

        {!hasOnboarded && (
          <Pressable
            style={styles.btnBackground}
            onPress={async () => {
              await AsyncStorage.setItem("hasOnboarded", "true");
              router.replace("/splash-one");
            }}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </Pressable>
        )}

        {/* Returning users → loader only */}
        {hasOnboarded && (
          <ActivityIndicator size="large" color={COLORS.primary} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  logo: {
    marginTop: 100,
    justifyContent: "center",
    width: 230,
    height: 250,
  },
  btnBackground: {
    backgroundColor: COLORS.primary,
    width: 250,
    borderRadius: 100,
    paddingVertical: 9,
  },
  btnText: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    textAlign: "center",
  },
});
