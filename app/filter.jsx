import { StyleSheet, Text, View } from "react-native";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const ContentButton = ({ icon, text }) => (
  <View style={{ flexDirection: "row" }}>
    {icon && icon}{" "}
    <Text style={{ fontFamily: FONTS.regular, fontSize: 14 }}>{text}</Text>
  </View>
);

const Filter = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo ScreenTitle={"Filter Events"} />
      <View style={styles.safeview}>
        <Text style={styles.filterText}>Filter</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Category</Text>
          <View style={styles.sectionContents}>
            <ContentButton text={"All Categories"} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeview: {
    padding: 20,
    backgroundColor: COLORS.background,
    flex: 1,
  },

  filterText: {
    fontFamily: FONTS.semibold,
    fontSize: 28,
    textAlign: "center",
    color: COLORS.primary,
  },

  sectionHeader: { fontFamily: FONTS.regular, fontSize: 24, color: "#454545" },

  sectionContents: { backgroundColor: "#9E9E9E17" },
});
export default Filter;
