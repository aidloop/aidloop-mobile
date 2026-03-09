import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.heading}>Discover Local Events</Text>
        <Text style={styles.text}>
          Find volunteer opportunities near you and make an impact
        </Text>
      </View>
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
          onPress={() => router.push("/")}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  topcontainer: {
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 60,
    fontFamily: FONTS.regular,
  },
  image: {
    justifyContent: "center",
    width: 220,
    height: 250,
  },
  btnBackground: {
    backgroundColor: COLORS.primary,
    width: 250,
    borderRadius: 100,
    paddingVertical: 7,
  },
  btnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
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
