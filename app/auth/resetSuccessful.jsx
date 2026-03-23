import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Successful from "../../assets/images/Successful.svg";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

export default function ResetSuccessful() {
  const router = useRouter();

  useEffect(() => {
    const backAction = () => true;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.safeview}>
        <View style={styles.contentContainer}>
          <Successful style={styles.success} />
          <Text style={styles.heading}>Password Reset Successful</Text>
          <Text style={styles.text}>
            Your password has been updated successfully. You can now log in with
            your new password.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.replace("/auth/login");
          }}
          style={styles.createBtn}
        >
          <Text style={styles.btnText}>Back to Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 90,
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.neutral,
    fontFamily: FONTS.regular,
    marginTop: 15,
    width: "85%",
    lineHeight: 24,
  },
  createBtn: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
  },
  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 22,
    fontFamily: FONTS.semibold,
  },
  success: {
    marginBottom: 40,
  },
});
