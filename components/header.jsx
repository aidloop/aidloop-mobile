import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function Header({ pageHeader }) {
  return (
    <View>
      <Text style={styles.text}>{pageHeader}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.semibold,
    fontSize: 24,
    color: COLORS.primary,
  },
});
