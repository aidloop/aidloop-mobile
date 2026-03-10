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
        <View style={styles.topcontainer}>
          <Text style={styles.heading}>Volunteer with Confidence</Text>
          <Text style={styles.text}>
            Every organization is reviewed before publishing events
          </Text>
        </View>
        <View style={styles.middlecontainer}>
          <Image
            source={require("../assets/images/onboarding2.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.bottomcontainer}>
          <Pressable
            style={styles.btnBackground}
            onPress={() => router.push("/splash-three")}
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
  topcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 500,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    marginTop: 20,
    paddingHorizontal: 50,
    fontFamily: FONTS.regular,
  },
  image: {
    justifyContent: "center",
    width: 280,
    height: 220,
  },
  btnBackground: {
    backgroundColor: COLORS.primary,
    width: 250,
    borderRadius: 100,
    paddingVertical: 9,
  },
  btnText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
  skipBtnBackground: {
    marginTop: 10,
  },
  skipBtnText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    textDecorationLine: "underline",
    fontFamily: FONTS.regular,
  },
});
