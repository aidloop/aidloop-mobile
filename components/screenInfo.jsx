import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../assets/images/Back.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const ScreenInfo = ({ ScreenTitle, subtext, icon }) => {
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Back color={COLORS.white} height={34} width={34} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignSelf: "center" }}>
        <Text style={styles.titleText}>{ScreenTitle}</Text>
        {subtext && subtext}
      </View>

      {icon && icon}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 105,
    // justifyContent: "",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    flex: 1,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    fontSize: 24,
    alignSelf: "center",
  },
});
export default ScreenInfo;
