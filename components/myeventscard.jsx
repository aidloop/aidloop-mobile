import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckMark from "../assets/images/checkmark.svg";
import CheckMark2 from "../assets/images/checkmark2.svg";
import DateIcon from "../assets/images/dateicon.svg";
import HamburgerIcon from "../assets/images/hamburgericon.svg";
import LocationIcon from "../assets/images/locationicon.svg";
import TimeIcon from "../assets/images/timeicon.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function MyEventsCard({
  title,
  image,
  date,
  time,
  location,
  people,
  rating,
  role,
  verification,
  hostedBy,
  volunteerRequirements,
  benefits,
  about,
  category,
  status,
}) {
  const router = useRouter();

  const isCompleted = status === "Completed";

  const iconColor = isCompleted ? "#448AFF" : "#1FDD19";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          router.push({
            pathname: "/eventdetails",
            params: {
              title,
              image,
              date,
              time,
              location,
              people,
              rating,
              role,
              verification,
              hostedBy,
              volunteerRequirements,
              benefits,
              about,
              category,
              status,
            },
          })
        }
      >
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <View style={styles.verificationContainer}>
            <CheckMark width={22} height={22} style={styles.verificationIcon} />
            <View style={styles.verificationTextContainer}>
              <Text style={styles.verificationText}>{verification}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.hostedbyItem}>
            <Text style={styles.hostedbytext}>Hosted by: {hostedBy}</Text>
            <CheckMark width={14} height={14} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <DateIcon width={14} height={14} />
              <Text style={styles.subtext}>{date}</Text>
            </View>
            <View style={styles.infoItem}>
              <TimeIcon width={14} height={14} />
              <Text style={styles.subtext}>{time}</Text>
            </View>
            <View style={styles.infoItem}>
              <LocationIcon width={14} height={14} />
              <Text style={styles.subtext}>{location}</Text>
            </View>
            <View style={styles.divider}></View>
          </View>
          <View style={styles.statusCover}>
            <View style={styles.statusContainer}>
              <CheckMark2 width={14} height={14} color={iconColor} />
              <Text style={styles.statusText}>{status}</Text>
            </View>
            <HamburgerIcon width={22} height={22} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: "100%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: 25,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 150,
  },
  verificationContainer: {
    width: 50,
    alignItems: "center",
    gap: 2,
    position: "absolute",
    right: 5,
    justifyContent: "center",
    top: "10%",
    transform: [{ translateY: -7 }],
  },
  verificationTextContainer: {
    backgroundColor: COLORS.neutral,
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 3,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)",
  },
  verificationText: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: FONTS.medium,
    textAlign: "center",
  },

  detailsContainer: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },

  infoContainer: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  infoItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  hostedbyItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtext: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    marginTop: 2,
  },
  hostedbytext: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginTop: 2,
  },

  divider: {
    width: "100%",
    backgroundColor: COLORS.neutral,
    height: 1,
    marginTop: 5,
  },

  statusCover: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  statusContainer: {
    backgroundColor: COLORS.shadow,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  statusText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: FONTS.medium,
    marginTop: 2,
  },
});
