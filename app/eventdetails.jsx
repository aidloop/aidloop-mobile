import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../api/api";
import { registerForEvent } from "../api/events";
import CheckMark from "../assets/images/checkmark.svg";
import DateIcon from "../assets/images/dateicon.svg";
import Host from "../assets/images/hosticon.svg";
import Location from "../assets/images/locationicon.svg";
import Role from "../assets/images/roleicon.svg";
import Rating from "../assets/images/staricon.svg";
import Time from "../assets/images/timeicon.svg";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function EventDetails() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      // year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await API.get(`/events/${eventId}`);
        console.log("Event Details", response.data);
        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleRegister = async () => {
    if (!selectedRole) {
      Alert.alert("Please select a volunteer role");
      return;
    }
    try {
      setRegistering(true);
      await registerForEvent(event._id, selectedRole);

      router.push("/eventregistrationsuccess");
    } catch (error) {
      Alert.alert(
        error.response?.data?.message || error.message || "Registration failed",
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ScreenInfo />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text
            style={{
              marginTop: 10,
              color: COLORS.neutral,
              fontFamily: FONTS.medium,
            }}
          >
            Loading event details...
          </Text>
        </View>
      </View>
    );
  }

  if (!event) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={{ fontFamily: FONTS.medium, fontSize: 18 }}>
          Event not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: COLORS.primary, fontFamily: FONTS.semibold }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const title = event.name || "Untitled Event";
  const category = event.category || "Uncategorized";
  const hostedBy = event.organizationId?.fullName || "Unknown Host";
  const verification =
    event.organizationId?.verificationStatus === "approved"
      ? "Verified"
      : "Unverified";
  const rating = event.rating || "No Ratings";
  const role = event.roles?.length > 0 ? event.roles.join(", ") : "Volunteer";
  const displayDate = formatDate(event.date);
  const displayTime = `${event.startTime} - ${event.endTime}`;
  const displayLocation = `${event.location?.venue || "TBD"}, ${event.location?.city || "Unknown"}`;
  const people = `${event.volunteerProgress.filled}/${event.volunteerProgress.total} slots filled`;
  const benefits = event?.certificateEnabled
    ? "Certificate Provided"
    : "Community Service";
  const about = event.description || "No Description";

  const imageSource =
    event.image && event.image.startsWith("http")
      ? { uri: event.image }
      : require("../assets/images/eventimage-1.png");

  const requirementsArray =
    event.requirements?.length > 0 ? event.requirements : ["None"];

  const rolesArray = event.roles?.length > 0 ? event.roles : [];

  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo />
      {/* <SafeAreaView style={styles.safeareaview}> */}
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
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
              <DateIcon width={16} height={16} />
              <Text style={styles.infoText}>{displayDate}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Time width={16} height={16} />
              <Text style={styles.infoText}>{displayTime}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Location width={16} height={16} />
              <Text style={styles.infoText}>{`${displayLocation}`}</Text>
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

            <View style={styles.bulletListContainer}>
              {requirementsArray.map((req, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{req}</Text>
                </View>
              ))}
            </View>

            {rolesArray.length > 0 && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedRole}
                  onValueChange={(itemValue) => setSelectedRole(itemValue)}
                  style={styles.picker}
                  dropdownIconColor={COLORS.primary}
                >
                  <Picker.Item
                    label="Select Role"
                    value=""
                    color={COLORS.neutral}
                  />
                  {rolesArray.map((role) => (
                    <Picker.Item key={role} label={role} value={role} />
                  ))}
                </Picker>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.registerButton,
                { opacity: registering ? 0.7 : 1 },
              ]}
              disabled={!selectedRole || registering}
              onPress={handleRegister}
            >
              {registering ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.registerText}>Register</Text>
              )}
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
    // paddingHorizontal: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 5,
    borderRadius: 20,
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

  pickerContainer: {
    backgroundColor: COLORS.shadow,
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 0,
    height: 50,
    borderRadius: 20,
    borderColor: COLORS.neutral,
    borderWidth: 1,
    overflow: "hidden",
    marginTop: 20,
  },
  picker: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: FONTS.medium,
    paddingHorizontal: 10,
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

  bulletListContainer: { marginTop: 8, gap: 6 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start" },
  bulletPoint: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#000000",
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    lineHeight: 22,
    flex: 1,
  },
});
