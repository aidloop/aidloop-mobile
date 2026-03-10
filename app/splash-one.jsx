import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
>>>>>>> Stashed changes
=======
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
>>>>>>> Stashed changes

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <View style={styles.topcontainer}>
          <Text style={styles.heading}>Welcome to AidLoop</Text>
          <Text style={styles.text}>
            Connect with verified volunteer opportunities in your community
          </Text>
        </View>
        <View style={styles.middlecontainer}>
          <Image
            source={require("../assets/images/onboarding1.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.bottomcontainer}>
          <Pressable
            style={styles.btnBackground}
            onPress={() => router.push("/splash-two")}
          >
            <Text style={styles.btnText}>Next</Text>
          </Pressable>
          <Pressable
            style={styles.skipBtnBackground}
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text style={styles.skipBtnText}>Skip</Text>
          </Pressable>
        </View>
      </View>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <View style={styles.middlecontainer}>
        <Image
          source={require("../assets/images/aidloop-logo-image.jpeg")}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomcontainer}>
        <Pressable
          style={styles.btnBackground}
          onPress={() => router.push("/splash-two")}
        >
          <Text style={styles.btnText}>Next</Text>
        </Pressable>
        <Pressable
          style={styles.skipBtnBackground}
          onPress={() => router.push("/splash")}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </Pressable>
      </View>
    </View>
=======
    </SafeAreaView>
>>>>>>> Stashed changes
=======
    </SafeAreaView>
>>>>>>> Stashed changes
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
  topcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    marginTop: 20,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    paddingHorizontal: 60,
=======
=======
>>>>>>> Stashed changes
    paddingHorizontal: 50,
    fontFamily: FONTS.regular,
>>>>>>> Stashed changes
  },
  image: {
    justifyContent: "center",
    width: 250,
    height: 260,
  },
  btnBackground: {
    backgroundColor: "navy",
    width: 250,
    borderRadius: 100,
    paddingVertical: 9,
  },
  btnText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  skipBtnBackground: {
    marginTop: 10,
  },
  skipBtnText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    textDecorationLine: "underline",
  },
});
