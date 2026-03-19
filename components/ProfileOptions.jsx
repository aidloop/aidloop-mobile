import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Right from "../assets/images/right.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const Row = ({ icon, title, subtitle, logout, onPress }) => (
  <View
    style={[
      styles.rowContainer,
      { borderColor: logout ? "#F44336" : "#448AFF" },
    ]}
  >
    <View style={styles.rowIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <TouchableOpacity onPress={onPress}>
      <Right color={COLORS.primary} width={18} height={18} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F9F9F9",
    borderWidth: 0.5,
    // borderColor: "#448AFF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },

  rowIcon: { backgroundColor: "#A5A5A540", padding: 5, borderRadius: "50%" },
  title: { fontFamily: FONTS.medium, fontSize: 16 },
  subtitle: { fontFamily: FONTS.regular, fontSize: 14, color: "#000000A8" },
});

export default Row;
