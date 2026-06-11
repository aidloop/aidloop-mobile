import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import FilterIcon from "../assets/images/filtericon.svg";
import SearchIcon from "../assets/images/searchicon.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function SearchBar({
  value,
  onChangeText,
  search,
  onFilterPress,
  ...props
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search events, NGOs, locations..."
          placeholderTextColor={COLORS.neutral}
          style={styles.input}
          returnKeyType="search"
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        <TouchableOpacity onPress={search} style={styles.searchIcon}>
          <SearchIcon
            // style={styles.searchIcon}
            width={20}
            height={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <FilterIcon width={15} height={15} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor: "green",
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderRadius: 16,
    height: 48,
    paddingLeft: 40,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    justifyContent: "center",
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  inputContainer: {
    position: "relative",
    // backgroundColor: "red",
    flex: 1,
  },

  filterButton: {
    marginLeft: 16,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
  },
});
