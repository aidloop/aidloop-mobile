import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../../api/api";

// Components
import EventCard from "../../components/eventcard";
import StatCard from "../../components/statcard";

// Icons
import FlameIcon from "../../assets/images/Flame.svg";
import MedalIcon from "../../assets/images/Medal.svg";
import NotificationIcon from "../../assets/images/Notification.svg";
import SilverBadgeIcon from "../../assets/images/SilverBadge.svg";
import SparkleIcon from "../../assets/images/Sparkle.svg";
import TrendIcon from "../../assets/images/Trend.svg";

import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

export default function Home() {
  const [greeting, setGreeting] = useState("Good morning");
  const [loading, setLoading] = useState(true);

  // --- DYNAMIC DATA STATES ---
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({
    done: 0,
    reliability: 0,
    upcoming: 0,
  });

  // set correct greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // fetch user data and stats
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Fetch the current logged-in user
        const response = await API.get("/user/me");
        const userData = response.data;

        setUser(userData);

        setUserStats({
          done: userData?.eventsCompleted || 0,
          reliability: userData?.reliabilityScore || 0,
          upcoming: userData?.upcomingEventsCount || 0,
        });
      } catch (error) {
        console.error("Failed to fetch user data on Home screen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const statsData = [
    {
      id: 1,
      Icon: MedalIcon,
      bgColor: "#FFF4E5",
      value: userStats.done.toString(), // Dynamic
      label: "Events Done",
    },
    {
      id: 2,
      Icon: TrendIcon,
      bgColor: "#EBF8FF",
      value: `${userStats.reliability}%`, // Dynamic
      label: "Reliability",
    },
    {
      id: 3,
      Icon: FlameIcon,
      bgColor: "#F0FFF4",
      value: userStats.upcoming.toString(), // Dynamic
      label: "Upcoming",
    },
  ];

  // --- LOADING SCREEN ---
  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.safeareaview,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size={40} color={COLORS.highlight} />
        <Text
          style={{
            marginTop: 10,
            color: COLORS.primary,
            fontFamily: FONTS.regular,
          }}
        >
          Loading Dashboard...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* --- 1. HEADER SECTION --- */}
        <View style={styles.headerContainer}>
          <View style={styles.profileSection}>
            <Image
              source={
                user?.profileImage
                  ? { uri: user.profileImage }
                  : require("../../assets/images/defaultProfile.jpg")
              }
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greetingText}>{greeting} 👋</Text>
              <Text style={styles.userName}>
                {user?.fullName.trim().split(" ")[0].toUpperCase() ||
                  "Volunteer"}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>
            <NotificationIcon width={24} height={24} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          {statsData.map((stat) => (
            <StatCard
              key={stat.id}
              Icon={stat.Icon}
              iconBgColor={stat.bgColor}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.badgeRow}>
              <SilverBadgeIcon width={32} height={32} />
              <View style={styles.badgeTextContainer}>
                <Text style={styles.badgeTitle}>Silver Volunteer</Text>
                <Text style={styles.badgeSubtitle}>
                  {userStats.reliability}% reliability score
                </Text>
              </View>
            </View>
            <View style={styles.eventsCountBox}>
              <Text style={styles.eventsCountNumber}>{userStats.done}</Text>
              <Text style={styles.eventsCountLabel}>events</Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.min((userStats.done / 10) * 100, 100)}%` },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressFooterText}>Gold at 10 events</Text>
            <Text style={styles.progressFooterText}>
              {Math.min((userStats.done / 10) * 100, 100)}%
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <SparkleIcon width={20} height={20} />
            <Text style={styles.sectionTitle}>Recommended for You</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/explore")}>
            <Text style={styles.seeAllText}>All {">"}</Text>
          </TouchableOpacity>
        </View>

        <EventCard
          eventId={"123"}
          image={require("../../assets/images/eventimage-1.png")}
          category="Tech"
          title="Tech Literacy Workshop"
          organization="Digital Youth Initiative"
          isVerified={true}
          date="May 18, 2026"
          time="10:00 AM"
          location="Ikeja City Mall, Lagos"
          slotsLeft={12}
          hasCertificate={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // Header Styles
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  profileSection: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1F3A5F",
  },
  greetingText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#6B7C93",
    marginBottom: 2,
  },
  userName: { fontFamily: FONTS.bold, fontSize: 18, color: "#0B1B3D" },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: "#E53E3E",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.white,
  },

  // Stats Row Container
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  // Progress Card Styles
  progressCard: {
    backgroundColor: "#1F3A5F",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  badgeTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 4,
  },
  badgeSubtitle: { fontFamily: FONTS.regular, fontSize: 12, color: "#A0AEC0" },
  eventsCountBox: { alignItems: "flex-end" },
  eventsCountNumber: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.white,
    lineHeight: 32,
  },
  eventsCountLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#A0AEC0",
  },
  progressBarContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 3,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 3,
  },
  progressFooter: { flexDirection: "row", justifyContent: "space-between" },
  progressFooterText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.white,
  },

  // Section Header Styles
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { fontFamily: FONTS.bold, fontSize: 18, color: "#1A202C" },
  seeAllText: { fontFamily: FONTS.medium, fontSize: 14, color: "#1F3A5F" },
});
