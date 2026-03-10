import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/splash-image.png")}
          style={styles.logo}
        />
        <Pressable
          style={styles.btnBackground}
          onPress={() => router.push("/splash-one")}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
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
    paddingVertical: 7,
  },
  btnText: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    textAlign: "center",
  },
});
