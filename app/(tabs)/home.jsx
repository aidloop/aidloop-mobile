import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../../api/api";
import EventCard from "../../components/eventcard";
import Header from "../../components/header";
import SearchBar from "../../components/searchbar";

import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  const router = useRouter();
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      // year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await API.get("/events");

        console.log("Fetched Events:", response.data);

        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeareaview, styles.scrollview]}>
        <Header />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("../search")}
        >
          <View pointerEvents="none">
            <SearchBar />
          </View>
        </TouchableOpacity>
        <View
          style={{
            // backgroundColor: "green",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={40} color={COLORS.primary} />
          <Text
            style={{
              marginTop: 10,
              color: COLORS.neutral,
            }}
          >
            Loading Events...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("../search")}
        >
          <View pointerEvents="none">
            <SearchBar />
          </View>
        </TouchableOpacity>

        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id || "undefined"}
              eventId={event._id}
              image={
                event.image
                  ? { uri: event.image }
                  : require("../../assets/images/eventimage-1.png")
              }
              verification={
                event.organizationId?.verificationStatus === "approved"
                  ? "Verified"
                  : "Unverified"
              }
              title={event.name || "Untitled Event"}
              date={formatDate(event.date) || "TBD"}
              location={event.location?.venue || "TBD"}
              city={event.location?.city || "Undefined"}
              time={`${event.startTime} - ${event.endTime}` || "TBD"}
              people={`${event.volunteerSlots} slots` || "Undefined"}
              role={
                event.roles?.length > 0 ? event.roles.join(", ") : "Volunteer"
              }
              rating={event.rating || "No Ratings"}
              about={event.description || "No Description"}
              category={event.category || "Undefined"}
              hostedBy={event.organizationId.fullName || "Unknown Host "}
              benefits={
                event.certificateEnabled
                  ? "Certificate of Participation"
                  : "No benefits"
              }
              volunteerRequirements={
                event.requirements?.length > 0
                  ? event.requirements.join(", ")
                  : "None"
              }
            />
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              color: COLORS.neutral,
            }}
          >
            No events available right now.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: { flex: 1, backgroundColor: COLORS.white },
  scrollview: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
