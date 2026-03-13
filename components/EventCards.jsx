import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

const EventCards = ({ image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.eventImage}>{image}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    height: 300,
    maxHeight: 300,
    borderRadius: 18,
  },
  eventImage: {
    borderTopStartRadius: 18,
    borderTopEndRadius: 18,
    height: "50%",
    backgroundColor: "red",
    overflow: "hidden",
  },
});
export default EventCards;
