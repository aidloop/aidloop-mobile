import { router, useFocusEffect, usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
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
      year: "numeric",
    });
  };

  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filterActive, setFilterActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("Any");
  const [filterDistance, setFilterDistance] = useState("Any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const categories = [
    "All",
    "Health",
    "Education",
    "Environment",
    "Community Service",
    "Tech",
  ];
  const dateOptions = ["Any", "This Week", "This Month"];
  const distanceOptions = ["Any", "< 5km", "< 10 km", "< 20 km"];

  const pathname = usePathname();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (pathname !== "/home" && pathname !== "/") return false;
        Alert.alert("Exit App", "Are you sure you want to exit AidLoop?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
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

      setAllEvents(response.data.events);
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

    handleClearFilters();
    await fetchEvents();

    setRefreshing(false);
  }, []);

  const runFilters = (categoryToApply) => {
    let filteredList = [...allEvents];

    if (categoryToApply !== "All") {
      filteredList = filteredList.filter(
        (event) => event.category === categoryToApply,
      );
    }

    if (verifiedOnly) {
      filteredList = filteredList.filter(
        (event) => event.organizationId?.verificationStatus === "approved",
      );
    }

    if (filterDate !== "Any") {
      const today = new Date();

      filteredList = filteredList.filter((event) => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);

        if (filterDate === "This Week") {
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          return eventDate >= today && eventDate <= nextWeek;
        }

        if (filterDate === "This Month") {
          return (
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        }

        return true;
      });
    }

    if (filterDistance !== "Any") {
      console.log("Distance filtering requires user GPS coordinates!");
    }

    setEvents(filteredList);
  };

  const handleClearFilters = () => {
    setFilterCategory("All");
    setActiveCategory("All");
    setFilterDate("Any");
    setFilterDistance("Any");
    setVerifiedOnly(false);
    setEvents(allEvents);
  };

  const handleApplyFilters = () => {
    setActiveCategory(filterCategory);
    setFilterActive(false);
    runFilters(filterCategory);
  };

  const handleHorizontalPillPress = (cat) => {
    setActiveCategory(cat);
    setFilterCategory(cat);
    runFilters(cat);
  };

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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
              if (!filterActive) setFilterCategory(activeCategory);
              setFilterActive(!filterActive);
            }}
          />
        </TouchableOpacity>

        {filterActive ? (
          <View style={styles.expandedFilterContainer}>
            <Text style={styles.filterLabel}>CATEGORY</Text>
            <View style={styles.pillWrap}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterPill,
                    filterCategory === cat && styles.filterPillActive,
                  ]}
                  onPress={() => setFilterCategory(cat)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      filterCategory === cat && styles.filterPillTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>DATE</Text>
            <View style={styles.pillWrap}>
              {dateOptions.map((dateObj) => (
                <TouchableOpacity
                  key={dateObj}
                  style={[
                    styles.filterPill,
                    filterDate === dateObj && styles.filterPillActive,
                  ]}
                  onPress={() => setFilterDate(dateObj)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      filterDate === dateObj && styles.filterPillTextActive,
                    ]}
                  >
                    {dateObj}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>DISTANCE</Text>
            <View style={styles.pillWrap}>
              {distanceOptions.map((dist) => (
                <TouchableOpacity
                  key={dist}
                  style={[
                    styles.filterPill,
                    filterDistance === dist && styles.filterPillActive,
                  ]}
                  onPress={() => setFilterDistance(dist)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      filterDistance === dist && styles.filterPillTextActive,
                    ]}
                  >
                    {dist}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>Verified NGOs only</Text>
              <Switch
                value={verifiedOnly}
                onValueChange={setVerifiedOnly}
                trackColor={{ false: "#E2E8F0", true: "#C3D4F7" }}
                thumbColor={verifiedOnly ? "#203A5E" : "#f4f3f4"}
              />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity onPress={handleClearFilters}>
                <Text style={styles.clearText}>Clear all filters</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleApplyFilters}>
                <Text style={styles.applyText}>Apply all Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.categoriesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((cat, index) => {
                const isActive = activeCategory === cat;
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => handleHorizontalPillPress(cat)}
                    style={[
                      styles.categoryPill,
                      isActive && styles.categoryPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {events.length > 0 ? (
          events.map((event) => {
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
                isVerified={
                  event.organizationId?.verificationStatus === "approved"
                }
                date={formatDate(event.date)}
                time={
                  event.startTime
                    ? `${event.startTime} - ${event.endTime}`
                    : "TBD"
                }
                location={
                  event.location?.venue
                    ? `${event.location.venue}, ${event.location.city || ""}`
                    : "TBD"
                }
                slotsLeft={slotsLeft}
                hasCertificate={!!event.certificateEnabled}
              />
            );
          })
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
          >
            <Text
              style={{
                marginTop: 50,
                color: COLORS.neutral,
                fontFamily: FONTS.semibold,
              }}
            >
              No events match your filters.
            </Text>
            <TouchableOpacity
              style={{
                borderColor: COLORS.primary,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                borderWidth: 1,
              }}
              onPress={handleClearFilters}
            >
              <Text>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollview: { flex: 1, paddingHorizontal: 20, marginTop: 20 },
  categoriesContainer: { marginVertical: 16 },
  categoriesScroll: { gap: 10, paddingRight: 20 },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryPillActive: { backgroundColor: "#203A5E", borderColor: "#203A5E" },
  categoryText: { fontFamily: FONTS.medium, fontSize: 14, color: "#4A5568" },
  categoryTextActive: { color: COLORS.white },
  expandedFilterContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  filterLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#6B7C93",
    letterSpacing: 1,
    marginBottom: 12,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: COLORS.white,
  },
  filterPillActive: { backgroundColor: "#203A5E", borderColor: "#203A5E" },
  filterPillText: { fontFamily: FONTS.medium, fontSize: 13, color: "#1A202C" },
  filterPillTextActive: { color: COLORS.white },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  toggleText: { fontFamily: FONTS.medium, fontSize: 16, color: "#2D3748" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearText: { fontFamily: FONTS.medium, fontSize: 14, color: "#E53E3E" },
  applyText: { fontFamily: FONTS.semibold, fontSize: 15, color: "#3182CE" },
});
