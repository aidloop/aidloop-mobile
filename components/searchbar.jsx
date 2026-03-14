import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import FilterIcon from "../assets/images/filtericon.svg";
import SearchIcon from "../assets/images/searchicon.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function SearchBar({ search, onFilterPress, ...props }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search events"
          placeholderTextColor={COLORS.neutral}
          style={styles.input}
          {...props}
        />
        <TouchableOpacity onPress={search} style={styles.searchIcon}>
          <SearchIcon
            // style={styles.searchIcon}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <FilterIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    borderColor: COLORS.neutral,
    borderWidth: 1,
    borderRadius: 12,
    width: 280,
    height: 52,
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
  },

  filterButton: {
    marginLeft: 16,
  },
});
