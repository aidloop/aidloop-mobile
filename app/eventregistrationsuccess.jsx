import { StyleSheet, Text, View } from "react-native";
import CheckMark from "../assets/images/Successful.svg";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function EventDetails() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo />
      <View style={styles.container}>
        <CheckMark width={100} height={100} style={styles.statusIcon} />
        <Text style={styles.title}>{"You're Registered!"}</Text>
        <Text style={styles.subText}>
          You have successfully registered for this event. Check your dashboard
          for event details and updates
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 40,
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: FONTS.semibold,
    color: COLORS.primary,
    marginTop: 20,
  },
  subText: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    marginTop: 15,
    lineHeight: 26,
    textAlign: "center",
    color: COLORS.neutral,
  },
});
