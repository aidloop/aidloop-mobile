import { StyleSheet, Text, View } from "react-native";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const Filter = () => {
  return (
    <View>
      <ScreenInfo ScreenTitle={"Filter Events"} />
      <View style={styles.safeview}>
        <Text style={styles.filterText}>Filter</Text>
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
});
export default Filter;
