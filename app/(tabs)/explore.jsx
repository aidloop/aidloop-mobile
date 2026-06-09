import { router, useFocusEffect, usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  RefreshControl,
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
import { FONTS } from "../../constants/fonts";

export default function Explore() {
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric", // Added year back to match the Figma design (May 18, 2026)
    });
  };

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const pathname = usePathname();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (pathname !== "/home" && pathname !== "/") {
          return false;
        }

        Alert.alert("Exit App", "Are you sure you want to exit AidLoop?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandlerSubscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => backHandlerSubscription.remove();
    }, [pathname]),
  );

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await API.get("/events");
      console.log("Fetched Events:", response.data);
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await API.get("/user/me");
        await fetchEvents();
      } catch {
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
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
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={40} color={COLORS.highlight} />
          <Text
            style={{
              marginTop: 10,
              color: COLORS.primary,
              fontFamily: FONTS.regular,
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
        refreshControl={
          <RefreshControl
            tintColor={COLORS.highlight}
            colors={[COLORS.highlight, COLORS.success, COLORS.neutral]}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
        <Header pageHeader={"Explore Events"} />

        <TouchableOpacity activeOpacity={0.8}>
          <SearchBar
            onFilterPress={() => {
              console.log("Filter button clicked. Old value:", filterActive);
              setFilterActive(!filterActive);
            }}
          />
        </TouchableOpacity>

        {filterActive ? (
          <View>
            <View></View>
          </View>
        ) : (
          <View>
            <View></View>
          </View>
        )}

        {events.length > 0 ? (
          events.map((event) => {
            // Calculate slots left safely
            const totalSlots = event.volunteerSlots || 0;
            const registered = event.registeredCount || 0;
            const slotsLeft = Math.max(0, totalSlots - registered);

            return (
              <EventCard
                key={event._id || Math.random().toString()}
                eventId={event._id}
                image={
                  event.image
                    ? { uri: event.image }
                    : require("../../assets/images/eventimage-1.png")
                }
                category={event.category || "Volunteer"}
                title={event.name || "Untitled Event"}
                organization={event.organizationId?.fullName || "Unknown Host"}
                // New boolean check for verification
                isVerified={
                  event.organizationId?.verificationStatus === "approved"
                }
                date={formatDate(event.date)}
                time={
                  event.startTime
                    ? `${event.startTime} - ${event.endTime}`
                    : "TBD"
                }
                // Combines venue and city into one string for the UI
                location={
                  event.location?.venue
                    ? `${event.location.venue}, ${event.location.city || ""}`
                    : "TBD"
                }
                slotsLeft={slotsLeft}
                // New boolean check for the certificate pill
                hasCertificate={!!event.certificateEnabled}
              />
            );
          })
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                marginTop: 50,
                color: COLORS.neutral,
                fontFamily: FONTS.semibold,
              }}
            >
              No events available right now.
            </Text>
            <TouchableOpacity
              style={{
                borderColor: COLORS.primary,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                borderWidth: 1,
              }}
              onPress={fetchEvents}
            >
              <Text>Refresh</Text>
            </TouchableOpacity>
          </View>
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
