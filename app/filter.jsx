import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Education from "../assets/images/Education.svg";
import Heart from "../assets/images/Heart.svg";
import PaintIcon from "../assets/images/PaintIcon.svg";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
const ContentButton = ({ icon, text }) => (
  <TouchableOpacity style={styles.contentBtn}>
    {icon && icon}
    <Text style={{ fontFamily: FONTS.regular, fontSize: 14 }}>{text}</Text>
  </TouchableOpacity>
);

const Filter = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo ScreenTitle={"Filter Events"} />
      <View style={styles.safeview}>
        <Text style={styles.filterText}>Filter</Text>
        {/* CATEGORY */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Category</Text>
          <View style={styles.sectionContents}>
            <ContentButton text={"All Categories"} />
            <ContentButton
              icon={<Heart color={"#448AFF"} />}
              text={"Charity"}
            />
            <ContentButton icon={<Heart color={"#448AFF"} />} text={"Health"} />
            <ContentButton
              icon={<Education color={"#448AFF"} />}
              text={"Education"}
            />
            <ContentButton
              icon={<PaintIcon color={"#448AFF"} />}
              text={"Youth Programs"}
            />
          </View>
        </View>
        {/* DATE */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Date</Text>
          <View style={styles.sectionContents}>
            <ContentButton text={"This Week"} />
            <ContentButton text={"This Month"} />
            <ContentButton text={"Next Month"} />
          </View>
        </View>
        {/* LOCATION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Location</Text>
          <View style={styles.sectionContents}>
            <ContentButton text={"Lagos"} />
            <ContentButton text={"Nigeria"} />
            <ContentButton text={"West Africa"} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeview: {
    padding: 20,
    backgroundColor: COLORS.white,
    flex: 1,
  },

  filterText: {
    fontFamily: FONTS.semibold,
    fontSize: 28,
    textAlign: "center",
    color: COLORS.primary,
  },

  sectionHeader: { fontFamily: FONTS.regular, fontSize: 24, color: "#454545" },

  sectionContents: {
    backgroundColor: "rgba(158, 158, 158, 0.09)",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  contentBtn: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    //   backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    gap: 10,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    marginVertical: 10,
    elevation: 5,
    // justifyContent: "flex-end",
  },

  section: { marginVertical: 20 },
});
export default Filter;
