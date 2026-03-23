import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../assets/images/Back.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const ScreenInfo = ({ ScreenTitle, subtext, icon }) => {
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Back color={COLORS.white} height={34} width={34} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{ScreenTitle}</Text>
        {subtext}
      </View>

      <View style={styles.iconContainer}>{icon}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    // paddingTop: 50,
    paddingBottom: -15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    fontSize: 22,
    textAlign: "center",
  },
});

export default ScreenInfo;
