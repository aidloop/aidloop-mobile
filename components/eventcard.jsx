import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Pulling in your standard icons (you may need to adjust the import names to match your SVG files)
import CalendarIcon from "../assets/images/Date.svg";
import LocationIcon from "../assets/images/Location.svg";
// You will need to export these two new icons from Figma if you haven't already:
import VerifiedIcon from "../assets/images/Checked.svg";
import GroupIcon from "../assets/images/peopleicon.svg";

import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function EventCard({
  eventId,
  image,
  category,
  title,
  organization,
  isVerified,
  date,
  time,
  location,
  slotsLeft,
  hasCertificate,
}) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/eventdetails?id=${eventId}`)}
      style={styles.cardContainer}
    >
      {/* --- TOP: Image Banner & Floating Tag --- */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.coverImage}
        />

        {/* Floating Category Tag */}
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* --- MIDDLE: Event Details --- */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Organization Row */}
        <View style={styles.orgRow}>
          <Text style={styles.orgText}>{organization}</Text>
          {isVerified && <VerifiedIcon width={16} height={16} />}
        </View>

        {/* Date & Time Row */}
        <View style={styles.infoRow}>
          <CalendarIcon width={16} height={16} />
          <Text style={styles.infoText}>
            {date} • {time}
          </Text>
        </View>

        {/* Location Row */}
        <View style={styles.infoRow}>
          <LocationIcon width={16} height={16} />
          <Text style={styles.infoText} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* --- BOTTOM: Footer Section --- */}
      <View style={styles.footerRow}>
        {/* Slots Left */}
        <View style={styles.slotsContainer}>
          <GroupIcon width={18} height={18} />
          <Text style={styles.slotsText}>{slotsLeft} slots left</Text>
        </View>

        {/* Certificate Pill */}
        {hasCertificate && (
          <View style={styles.certificatePill}>
            <Text style={styles.certificateText}>Certificate</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Soft outline from the design
    overflow: "hidden", // Keeps the image inside the rounded corners
  },

  // Image Section
  imageContainer: {
    width: "100%",
    height: 140,
    position: "relative",
    backgroundColor: "#F3F4F6",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryTag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    color: "#1F3A5F",
    fontFamily: FONTS.semibold,
    fontSize: 12,
  },

  // Middle Details Section
  detailsContainer: {
    padding: 16,
    paddingBottom: 12, // Less padding at the bottom to sit closer to the divider
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: "#0B1B3D", // Very dark navy/black
    marginBottom: 4,
  },
  orgRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  orgText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#6B7C93",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#6B7C93",
    flexShrink: 1,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#EDF2F7",
    marginHorizontal: 16,
  },

  // Footer Section
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 12,
  },
  slotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  slotsText: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: "#3B5998", // Blue matching the icon
  },
  certificatePill: {
    backgroundColor: "#F59E0B", // The orange from the design
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  certificateText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
});
