import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function StatCard({ Icon, iconBgColor, value, label }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.iconBox, { backgroundColor: iconBgColor }]}>
        {Icon && <Icon width={16} height={16} />}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flex: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 2,
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: "#1A202C",
    // marginBottom: 2,
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: "#718096",
  },
});
