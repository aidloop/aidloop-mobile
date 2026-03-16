import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Right from "../assets/images/right.svg";
import { FONTS } from "../constants/fonts";

const Row = ({ icon, title, subtitle, logout, onPress }) => (
  <View style={[styles.rowContainer]}>
    <View style={styles.rowIcon}>{icon}</View>
    <View style={{ flex: 1, gap: 7 }}>
      <Text style={[styles.title, { color: logout ? "#F44336" : null }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: logout ? "red" : null }]}>
        {subtitle}
      </Text>
    </View>
    <TouchableOpacity onPress={onPress}>
      <Right color={"#4F4F4F"} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#A5A5A540",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginVertical: 10,
  },

  rowIcon: { padding: 5, borderRadius: "50%" },
  title: { fontFamily: FONTS.medium, fontSize: 20 },
  subtitle: { fontFamily: FONTS.regular, fontSize: 14 },
});

export default Row;
