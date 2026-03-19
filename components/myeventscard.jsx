import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cancel from "../assets/images/cancelevent.svg";
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
  eventId,
}) {
  const router = useRouter();

  // --- 1. OUR TWO MODAL STATES ---
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false); // NEW STATE!

  const isCompleted = status === "Completed";
  const iconColor = isCompleted ? "#448AFF" : "#1FDD19";

  const handleViewDetails = () => {
    setIsMenuVisible(false);
    router.push({
      pathname: "/eventdetails",
      params: { eventId },
    });
  };

  // --- 2. OPEN THE CANCEL MODAL INSTEAD OF AN ALERT ---
  const handleCancelRegistration = () => {
    setIsMenuVisible(false); // Close the hamburger menu
    setIsCancelModalVisible(true); // Open the warning popup
  };

  // --- 3. EXECUTE THE CANCELLATION ---
  const confirmCancel = () => {
    console.log("Canceling event:", eventId);
    setIsCancelModalVisible(false); // Close the modal
    // TODO: We will add the API call here next!
  };

  return (
    <View style={styles.container}>
      <View>
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

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsMenuVisible(true)}
              style={{ padding: 5 }}
            >
              <HamburgerIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* --- MENU MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsMenuVisible(false)}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleViewDetails}
            >
              <Text style={styles.menuText}>View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleCancelRegistration}
            >
              <Text style={styles.menuText}>Cancel Registration</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- NEW DESIGNED CANCEL CONFIRMATION MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCancelModalVisible}
        onRequestClose={() => setIsCancelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.cancelModalBox}>
            {/* Warning Icon Placeholder (Replace this Text with your SVG if you have one!) */}
            <View style={styles.warningIconContainer}>
              <Cancel width={100} height={100} />
            </View>

            <Text style={styles.cancelTitle}>Cancel Event?</Text>
            <Text style={styles.cancelText}>
              Are you sure you want to cancel this event? This action cannot be
              undone.
            </Text>

            <TouchableOpacity
              style={styles.noButton}
              activeOpacity={0.7}
              onPress={() => setIsCancelModalVisible(false)}
            >
              <Text style={styles.noButtonText}>No, Keep Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.yesButton}
              activeOpacity={0.7}
              onPress={confirmCancel}
            >
              <Text style={styles.yesButtonText}>Yes, Cancel Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: 55,
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
  title: { fontSize: 24, fontFamily: FONTS.bold, color: COLORS.primary },
  infoContainer: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  infoItem: { flexDirection: "row", gap: 5, alignItems: "center" },
  hostedbyItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtext: { fontSize: 12, fontFamily: FONTS.medium, marginTop: 2 },
  hostedbytext: { fontSize: 12, fontFamily: FONTS.regular, marginTop: 2 },
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

  /* --- MODAL MENU STYLES --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuBox: {
    backgroundColor: COLORS.white,
    width: "70%",
    borderRadius: 12,
    paddingVertical: 10,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  menuItem: { paddingVertical: 15, alignItems: "center" },
  menuText: { fontFamily: FONTS.semibold, fontSize: 18, color: COLORS.primary },
  menuDivider: { height: 1, backgroundColor: "#E0E0E0", width: "100%" },

  /* --- NEW CANCEL MODAL STYLES --- */
  cancelModalBox: {
    backgroundColor: COLORS.white,
    width: "85%",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  warningIconContainer: {
    marginBottom: 10,
  },
  cancelTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 22,
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  cancelText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  noButton: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  noButtonText: {
    fontFamily: FONTS.semibold,
    fontSize: 18,
    color: "#000",
  },
  yesButton: {
    width: "100%",
    backgroundColor: "#EB4E4E", // The bright red from your Figma design
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  yesButtonText: {
    fontFamily: FONTS.semibold,
    fontSize: 18,
    color: COLORS.white,
  },
});
