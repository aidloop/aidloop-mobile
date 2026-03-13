import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const EventCards = ({ image, eventName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.eventImage}>{image}</View>
      <View style={styles.textview}>
        <Text style={styles.eventText}>{eventName}</Text>
      </View>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.highlight,
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
    // marginBottom: 5,
  },
  eventText: { color: COLORS.primary, fontFamily: FONTS.bold, fontSize: 24 },
  textview: { padding: 10 },
  border: { borderWidth: 0.5, width: "100%", borderColor: COLORS.neutral },
});
export default EventCards;
