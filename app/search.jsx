import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cancel from "../assets/images/Cancel.svg";
import ScreenInfo from "../components/screenInfo";
import SearchBar from "../components/searchbar";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const SearchListItem = ({ text }) => (
  <View
    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}
  >
    <TouchableOpacity style={{ flex: 1 }}>
      <Text style={styles.componentText}>{text}</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Cancel color={COLORS.highlight} />
    </TouchableOpacity>
  </View>
);
const Search = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo ScreenTitle={"Search Events"} />
      <View style={styles.safeview}>
        <SearchBar
          autoFocus={true}
          onFilterPress={() => console.log("OPen Filter screen")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.property}>{"Recent Searches"}</Text>
              <View style={styles.propView}>
                <SearchListItem text={"Community Cleanup"} />
                <SearchListItem text={"Youth Program"} />
                <SearchListItem text={"Food Bank"} />
                <SearchListItem text={"Empowerment"} />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.property}>{"Popular Categories"}</Text>
              <View style={styles.propView}>
                <SearchListItem text={"Environmental "} />
                <SearchListItem text={"Health & Wellness"} />
                <SearchListItem text={"Food Bank"} />
                <SearchListItem text={"Arts & Culture"} />
                <SearchListItem text={"Youth & Sports"} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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

  section: { marginVertical: 20 },

  property: { fontFamily: FONTS.regular, fontSize: 16, color: "#2A2A2A" },

  componentText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.neutral,
    flex: 1,
  },

  propView: {
    backgroundColor: "#9E9E9E0D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
export default Search;
