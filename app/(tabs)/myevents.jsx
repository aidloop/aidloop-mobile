import { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyEventsCard from "../../components/myeventscard";
import ScreenInfo from "../../components/screenInfo";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

import { router } from "expo-router";
import API from "../../api/api";

export default function MyEventsScreen() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const filteredEvents =
    activeTab === "upcoming"
      ? events.filter((item) => item.status === "registered")
      : events.filter((item) => item.status === "attended");

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const fetchMyEvents = async () => {
    try {
      const response = await API.get("/applications/registrations/me");
      const registrations = response.data || [];

      const particularEvent = await Promise.all(
        registrations.map(async (reg) => {
          try {
            const eventRes = await API.get(`/events/${reg.eventId._id}`);
            const fullEventDetails = eventRes.data.data || eventRes.data;

            return {
              ...reg,
              eventId: fullEventDetails,
            };
          } catch (err) {
            console.error(`Failed to fetch event ${reg.eventId._id}`, err);
            return reg;
          }
        }),
      );

      setEvents(particularEvent);
    } catch (error) {
      console.error("Error fetching my events:", error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchMyEvents();
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMyEvents();
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ScreenInfo ScreenTitle={"My Events"} />
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Loading your events...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenInfo ScreenTitle={"My Events"} />

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.highlight}
            colors={[
              COLORS.highlight,
              COLORS.success,
              COLORS.primary,
              COLORS.neutral,
            ]}
          />
        }
      >
        {filteredEvents.length === 0 ? (
          <Text style={styles.emptyText}>No {activeTab} events yet</Text>
        ) : (
          filteredEvents.map((item) => {
            const event = item.eventId;
            const eventKey = event._id;

            const imageSource =
              event?.image && event.image.startsWith("http")
                ? { uri: event.image }
                : require("../../assets/images/eventimage-1.png");

            const hostedBy = event?.organizationId?.fullName || "Organization";

            const people = event?.volunteerProgress
              ? `${event.volunteerProgress.filled}/${event.volunteerProgress.total}`
              : `${event?.registeredCount || 0}/${event?.volunteerSlots || 0}`;

            const getStatusText = (status) => {
              switch (status) {
                case "registered":
                  return "You're Registered";
                case "attended":
                  return "Completed";
                default:
                  return "Unknown";
              }
            };

            return (
              <MyEventsCard
                key={item._id}
                image={imageSource}
                verification={
                  event?.organizationId?.verificationStatus === "approved"
                    ? "Verified"
                    : "Unverified"
                }
                title={event?.name}
                date={formatDate(event?.date)}
                location={(() => {
                  const venue = event?.location?.venue || "TBD";
                  const city = event?.location?.city || "Unknown";
                  const combined = `${venue}, ${city}`;
                  return combined.length > 17
                    ? combined.slice(0, 14) + "..."
                    : combined;
                })()}
                time={`${event?.startTime} - ${event?.endTime}`}
                people={people}
                role={item?.role}
                rating={
                  event.organizerRating?.average
                    ? Number(event.organizerRating.average).toFixed(1)
                    : "No Ratings"
                }
                hostedBy={hostedBy}
                benefits={
                  event?.certificateEnabled
                    ? "Certificate Provided"
                    : "Community Service"
                }
                about={event?.description}
                category={event?.category}
                status={getStatusText(item?.status)}
                volunteerRequirements={event?.requirements}
                eventId={item.eventId._id}
                regId={item._id}
                onRefreshTrigger={onRefresh}
                onpress={() =>
                  router.push({
                    pathname: "/rateEvents",
                    params: {
                      eventKey,
                    },
                  })
                }
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 25,
  },
  tab: { paddingVertical: 5, paddingHorizontal: 5 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: COLORS.primary },
  tabText: { fontSize: 24, fontFamily: FONTS.semibold, color: "#9E9E9E99" },
  activeText: { color: COLORS.primary },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.neutral,
  },
  scrollView: { paddingHorizontal: 20 },
});
