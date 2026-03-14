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
        <Back color={COLORS.white} height={48} width={24} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
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
    fontSize: 28,
  },
});
export default ScreenInfo;
