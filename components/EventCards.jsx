import { StyleSheet, Text, View } from "react-native";
import Date from "../assets/images/Date.svg";
import Location from "../assets/images/Location.svg";
import Time from "../assets/images/Time.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const Details = ({ icon, text }) => (
  <View style={styles.input}>
    {icon}{" "}
    <Text style={{ fontFamily: FONTS.medium, fontSize: 12 }}>{text}</Text>
  </View>
);
const EventCards = ({
  image,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.eventImage}>{image}</View>
      <View style={styles.textview}>
        <View style={{}}>
          <Text style={styles.eventText}>{eventName}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.details}>
          <Details icon={<Date />} text={eventDate} />
          <Details icon={<Time />} text={eventTime} />
          <Details icon={<Location />} text={eventLocation} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    // backgroundColor: "pink",
  },
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
  border: {
    borderWidth: 0.5,
    width: "100%",
    borderColor: COLORS.neutral,
  },
  details: { flexDirection: "row", gap: 8, justifyContent: "space-around" },
});
export default EventCards;
