import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View>
        <Text>Home Screen</Text>
        <Pressable
          style={styles.skipBtnBackground}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: { flex: 1, paddingHorizontal: 10 },
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
