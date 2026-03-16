import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../assets/images/Back.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const ScreenInfo = ({ ScreenTitle }) => {
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Back color={COLORS.white} height={34} width={34} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{ScreenTitle}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    // height: 80,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    flex: 1,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    fontSize: 24,
  },
});
export default ScreenInfo;
