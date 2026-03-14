import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View>
        <Text style={styles.text}>Profile Screen</Text>
        <TouchableOpacity
          onPress={() => router.push("/createAccount")}
          style={styles.button}
        >
          <Text style={styles.btntext}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  text: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: 24,
    color: COLORS.black,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btntext: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: 24,
    color: COLORS.white,
    textAlign: "center",
  },
});
