import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckMark from "../assets/images/checkmark.svg";
import Date from "../assets/images/dateicon.svg";
import Host from "../assets/images/hosticon.svg";
import Location from "../assets/images/locationicon.svg";
import Role from "../assets/images/roleicon.svg";
import Rating from "../assets/images/staricon.svg";
import Time from "../assets/images/timeicon.svg";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function EventDetails() {
  const {
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
  } = useLocalSearchParams();

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo />
      {/* <SafeAreaView style={styles.safeareaview}> */}
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
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
          <View style={styles.titleContainer}>
            <View style={styles.category}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.infoContainer}>
              <Host width={16} height={16} />
              <Text style={styles.infoText}>Hosted by: {hostedBy}</Text>
            </View>
            <View style={styles.infoContainer2}>
              <View style={styles.infoContainer}>
                <CheckMark width={16} height={16} />
                <Text style={styles.infoText}>Verified Organization</Text>
              </View>
              <View style={styles.infoContainer}>
                <Rating width={16} height={16} />
                <Text style={styles.infoText}>{rating}</Text>
              </View>
            </View>
            <View style={styles.volunteerContainer}>
              <Role width={16} height={16} />
              <Text style={styles.infoText}>Volunteers Role: {role}</Text>
            </View>
          </View>
          <View style={styles.coloredContainer}>
            <View style={styles.infoContainer}>
              <Date width={16} height={16} />
              <Text style={styles.infoText}>{date}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Time width={16} height={16} />
              <Text style={styles.infoText}>{time}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Location width={16} height={16} />
              <Text style={styles.infoText}>{location}</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <View style={styles.volunteerContainer}>
              <Host width={16} height={16} />
              <Text style={styles.infoText}>Volunteer Progress: {people}</Text>
            </View>
            <View style={styles.benefitContainer}>
              <Text style={styles.infoText2}>Benefits</Text>
              <Text style={styles.subText}>{benefits}</Text>
            </View>
          </View>
          <View style={styles.coloredContainer}>
            <Text style={styles.infoText2}>About</Text>
            <Text style={styles.subText}>{about}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.infoText2}>Volunteer Requirement</Text>
            <Text style={styles.subText}>{volunteerRequirements}</Text>
            <TouchableOpacity
              style={styles.registerButton}
              activeOpacity={0.9}
              onPress={() => router.push("/eventregistrationsuccess")}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  safeareaview: { flex: 1, backgroundColor: COLORS.white },
  scrollview: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  image: {
    width: "100%",
    height: 240,
  },
  statusContainer: {
    width: 60,
    alignItems: "center",
    gap: 5,
    position: "absolute",
    right: 5,
    justifyContent: "center",
    top: "10%",
    transform: [{ translateY: -7 }],
  },
  statusTextContainer: {
    backgroundColor: COLORS.neutral,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 3,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)",
  },
  statusText: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: FONTS.medium,
    textAlign: "center",
  },

  detailsContainer: {
    gap: 20,
    marginTop: -40,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  category: {
    backgroundColor: COLORS.shadow,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
  },

  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginTop: 10,
  },

  infoContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  infoContainer2: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    marginTop: 3,
    marginLeft: 5,
  },
  infoText2: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    marginTop: 3,
  },
  subText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    marginTop: 5,
    lineHeight: 22,
  },

  volunteerContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    backgroundColor: COLORS.shadow,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderColor: COLORS.neutral,
    borderWidth: 1,
  },

  coloredContainer: {
    backgroundColor: COLORS.shadow,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },

  benefitContainer: {
    marginTop: 20,
  },

  registerButton: {
    backgroundColor: COLORS.primary,
    width: "100%",
    borderRadius: 100,
    paddingVertical: 7,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "center",
  },
  registerText: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
});
