import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Education from "../assets/images/Education.svg";
import Heart from "../assets/images/Heart.svg";
import PaintIcon from "../assets/images/PaintIcon.svg";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
const ContentButton = ({ icon, text, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.contentBtn, isSelected && styles.contentBtnActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {icon && icon}
    <Text
      style={[styles.filterItemText, isSelected && styles.filterItemTextActive]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleClear = () => {
    setSelectedCategory("All Categories");
    setSelectedDate(null);
    setSelectedLocation(null);
    Alert.alert("FILTER CLEARED", "No search filter input");
  };

  const handleApply = () => {
    const filterSearchEvents = {
      category: selectedCategory,
      date: selectedDate,
      location: selectedLocation,
    };
    console.log("Search filters", filterSearchEvents);
    router.back();
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenInfo ScreenTitle={"Filter Events"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        style={styles.safeview}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.filterText}>Filter</Text>
        {/* CATEGORY */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Category</Text>
          <View style={styles.sectionContents}>
            <ContentButton
              text={"All Categories"}
              isSelected={selectedCategory === "All Categories"}
              onPress={() => setSelectedCategory("All Categories")}
            />
            <ContentButton
              icon={
                <Heart
                  color={selectedCategory === "Charity" ? "#FFF" : "#448AFF"}
                />
              }
              text={"Charity"}
              isSelected={selectedCategory === "Charity"}
              onPress={() => setSelectedCategory("Charity")}
            />
            <ContentButton
              icon={
                <Heart
                  color={selectedCategory === "Health" ? "#FFF" : "#448AFF"}
                />
              }
              text={"Health"}
              isSelected={selectedCategory === "Health"}
              onPress={() => setSelectedCategory("Health")}
            />
            <ContentButton
              icon={
                <Education
                  color={selectedCategory === "Education" ? "#FFF" : "#448AFF"}
                />
              }
              text={"Education"}
              isSelected={selectedCategory === "Education"}
              onPress={() => setSelectedCategory("Education")}
            />
            <ContentButton
              icon={
                <PaintIcon
                  color={
                    selectedCategory === "Youth Programs" ? "#FFF" : "#448AFF"
                  }
                />
              }
              text={"Youth Programs"}
              isSelected={selectedCategory === "Youth Programs"}
              onPress={() => setSelectedCategory("Youth Programs")}
            />
          </View>
        </View>
        {/* DATE */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Date</Text>
          <View style={styles.sectionContents}>
            {["This Week", "This Month", "Next Month"].map((date) => (
              <ContentButton
                key={date}
                text={date}
                isSelected={selectedDate === date}
                onPress={() => {
                  setSelectedDate(date);
                  console.log("Selected date:", date);
                }}
              />
            ))}
          </View>
        </View>
        {/* LOCATION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Location</Text>
          <View style={styles.sectionContents}>
            {["Lagos", "Nigeria", "West Africa"].map((location) => (
              <ContentButton
                key={location}
                text={location}
                isSelected={selectedLocation === location}
                onPress={() => {
                  setSelectedLocation(location);
                  console.log("Preferred location is: ", location);
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.bottomBtn} onPress={handleClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={handleApply}>
          <Text style={styles.btnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeview: {
    padding: 20,
    // backgroundColor: COLORS.white,
    flex: 1,
  },

  filterText: {
    fontFamily: FONTS.semibold,
    fontSize: 28,
    textAlign: "center",
    color: COLORS.primary,
    marginVertical: 10,
  },

  sectionHeader: {
    fontFamily: FONTS.regular,
    fontSize: 24,
    color: "#454545",
    marginBottom: 10,
  },

  sectionContents: {
    backgroundColor: "rgba(158, 158, 158, 0.09)",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    borderRadius: 8,
    padding: 15,
  },

  contentBtn: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    //   backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 12,
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

  contentBtnActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  filterItemText: {
    color: "#454545",
    fontFamily: FONTS.regular,
    fontSize: 14,
  },

  filterItemTextActive: {
    color: COLORS.white,
  },

  section: { marginVertical: 10 },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    bottom: 0,
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  bottomBtn: {
    backgroundColor: COLORS.primary,
    flex: 0.45,
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 28,
  },
  btnText: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily: FONTS.semibold,
    fontSize: 24,
  },
});
export default Filter;
