import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Date from "../assets/images/Date.svg";
import Location from "../assets/images/Location.svg";
import Slot from "../assets/images/Slot.svg";
import Star from "../assets/images/Star.svg";
import Status from "../assets/images/Status.svg";
import Time from "../assets/images/Time.svg";
import Upload from "../assets/images/Upload.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const Details = ({ icon, text }) => (
  <View style={styles.input}>
    {icon}
    <Text style={{ fontFamily: FONTS.medium, fontSize: 12 }}>{text}</Text>
  </View>
);
const EventCards = ({
  image,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventSlots,
  eventRatings,
  eventStatus,
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
        <View style={[styles.details]}>
          <Details icon={<Slot />} text={eventSlots} />
          <Details icon={<Status />} text={eventStatus} />
          <Details
            icon={
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Star />
                <Star />
                <Star />
              </View>
            }
            text={eventRatings}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Upload />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  card: {
    backgroundColor: COLORS.white,
    // height: 300,
    // maxHeight: 300,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: COLORS.neutral,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: 28,
    height: 40.83,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: FONTS.semibold,
    fontSize: 24,
    color: COLORS.white,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    gap: 15,
    // backgroundColor: "pink",
  },
  eventImage: {
    borderTopStartRadius: 18,
    borderTopEndRadius: 18,
    height: 165,
    backgroundColor: COLORS.highlight,
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
  details: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around",
    // backgroundColor: "red",
    // paddingVertical: -15,
  },
});
export default EventCards;
