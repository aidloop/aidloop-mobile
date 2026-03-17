import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckMark from "../assets/images/checkmark.svg";
import DateIcon from "../assets/images/dateicon.svg";
import LocationIcon from "../assets/images/locationicon.svg";
import PeopleIcon from "../assets/images/peopleicon.svg";
import RegisterIcon from "../assets/images/registericon.svg";
import RoleIcon from "../assets/images/roleicon.svg";
import StarIcon from "../assets/images/staricon.svg";
import TimeIcon from "../assets/images/timeicon.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function EventCard({
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
}) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.statusContainer}>
          <CheckMark width={22} height={22} style={styles.statusIcon} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusText}>{verification}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.divider}></View>
          <View style={styles.infoItem}>
            <DateIcon width={14} height={14} color={"#6B7C93"} />
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
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <PeopleIcon width={14} height={14} />
            <Text style={styles.subtext}>{people}</Text>
          </View>
          <View style={styles.infoItem}>
            <RoleIcon width={14} height={14} />
            <Text style={styles.subtext}>{role}</Text>
          </View>
          <View style={styles.infoItem}>
            <StarIcon width={20} height={20} />
            <Text style={styles.subtext}>{rating}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewDetailsButton}
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
                },
              })
            }
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
          <RegisterIcon width={22} height={22} />
        </View>
      </View>
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
  statusContainer: {
    width: 50,
    alignItems: "center",
    gap: 2,
    position: "absolute",
    right: 5,
    justifyContent: "center",
    top: "10%",
    transform: [{ translateY: -7 }],
  },
  statusTextContainer: {
    backgroundColor: COLORS.neutral,
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 3,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)",
    width: 50,
  },
  statusText: {
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
  subtext: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    marginTop: 2,
  },

  divider: {
    width: "100%",
    backgroundColor: COLORS.neutral,
    height: 1,
    marginTop: -5,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewDetailsButton: {
    backgroundColor: COLORS.primary,
    width: 170,
    borderRadius: 100,
    paddingVertical: 5,
  },
  viewDetailsText: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
});
