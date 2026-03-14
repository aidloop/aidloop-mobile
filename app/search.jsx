import { router } from "expo-router";
import { useState } from "react";
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

const SearchListItem = ({ text, onSearch, onCancel }) => (
  <View
    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}
  >
    <TouchableOpacity style={{ flex: 1 }} onPress={() => onSearch(text)}>
      <Text style={styles.componentText}>{text}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        onCancel(text);
      }}
    >
      <Cancel color={COLORS.highlight} />
    </TouchableOpacity>
  </View>
);
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Community Cleanup",
    "Youth Program",
    "Food Bank",
    "Empowerment",
  ]);
  const popularCategories = [
    "Environmental",
    "Health & Wellness",
    "Food Bank",
    "Arts & Culture",
    "Youth & Sports",
  ];

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return; //this works in the case of an empty search it does nothing

    console.log("Searching for:", searchQuery);
  };

  const handleCancelItem = (cancelledItem) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((item) => item !== cancelledItem),
    );
    console.log(`Remove ${cancelledItem} from history`);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo ScreenTitle={"Search Events"} />
      <View style={styles.safeview}>
        <SearchBar
          autoFocus={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
          search={() => handleSearch(searchQuery)}
          onSubmitEditing={() => handleSearch(searchQuery)}
          onFilterPress={() => {
            console.log("OPen Filter screen");
            router.push("/filter");
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.property}>{"Recent Searches"}</Text>
                <View style={styles.propView}>
                  {recentSearches.map((item, index) => (
                    <SearchListItem
                      key={index}
                      text={item}
                      onSearch={handleSearch}
                      onCancel={handleCancelItem}
                    />
                  ))}
                </View>
              </View>
            )}
            <View style={styles.section}>
              <Text style={styles.property}>{"Popular Categories"}</Text>
              <View style={styles.propView}>
                {popularCategories.map((item, index) => (
                  <SearchListItem
                    key={index}
                    text={item}
                    onSearch={handleSearch}
                    onCancel={() =>
                      console.log("Cannot delete fixed categories ")
                    }
                  />
                ))}
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
