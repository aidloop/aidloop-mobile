import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/aidloop-logo-image.jpeg")}
        style={styles.logo}
      />
      <Pressable
        style={styles.btnBackground}
        onPress={() => router.push("/splash-one")}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    marginTop: 100,
    justifyContent: "center",
    width: 220,
    height: 250,
  },
  btnBackground: {
    backgroundColor: "navy",
    width: 250,
    borderRadius: 100,
    paddingVertical: 7,
  },
  btnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
