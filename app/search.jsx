import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../api/api";
import Cancel from "../assets/images/Cancel.svg";
import EventCard from "../components/eventcard";
import ScreenInfo from "../components/screenInfo";
import SearchBar from "../components/searchbar";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const SearchListItem = ({ text, onSearch, onCancel }) => (
  <View
    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}
  >
    <TouchableOpacity style={{ flex: 1 }} onPress={() => onSearch(text)}>
      <Text style={styles.componentText}>{text}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onCancel(text)}>
      <Cancel color={COLORS.highlight} />
    </TouchableOpacity>
  </View>
);

const Search = () => {
  const { filterCategory, filterLocation } = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [recentSearches, setRecentSearches] = useState([
    "Community Cleanup",
    "Youth Program",
    "Food Bank",
  ]);
  const popularCategories = [
    "Environmental",
    "Health & Wellness",
    "Charity",
    "Education",
    "Youth Programs",
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await API.get("/events");
        const data = response.data.events;
        setAllEvents(data);
      } catch (error) {
        console.error("Error fetching for search:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let results = allEvents;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (event) =>
          event.name?.toLowerCase().includes(query.trim()) ||
          event.category?.toLowerCase().includes(query.trim()) ||
          event.description?.toLowerCase().includes(query.trim()),
      );
    }

    if (filterCategory) {
      results = results.filter((event) => event.category === filterCategory);
    }

    if (filterLocation) {
      results = results.filter(
        (event) =>
          event.location?.city?.includes(filterLocation) ||
          event.location?.country?.includes(filterLocation),
      );
    }

    setFilteredEvents(results);

    if (searchQuery.trim() !== "" || filterCategory || filterLocation) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, allEvents, filterCategory, filterLocation]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCancelItem = (cancelledItem) => {
    setRecentSearches((prev) => prev.filter((item) => item !== cancelledItem));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo ScreenTitle={"Search Events"} />
      <View style={styles.safeview}>
        <SearchBar
          autoFocus={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
          search={() => handleSearch(searchQuery)}
          onFilterPress={() => router.push("/filter")}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={{ marginTop: 10, color: COLORS.neutral }}>
                  Loading events...
                </Text>
              </View>
            ) : isSearching ? (
              <View style={styles.section}>
                <Text style={[styles.property, { marginBottom: 15 }]}>
                  {filteredEvents.length} results Found
                </Text>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event._id || Math.random().toString()}
                      eventId={event._id}
                      image={
                        event.image
                          ? { uri: event.image }
                          : require("../assets/images/eventimage-1.png")
                      }
                      verification={
                        event.organizationId?.verificationStatus === "approved"
                          ? "Verified"
                          : "Unverified"
                      }
                      title={event.name || "Untitled Event"}
                      date={formatDate(event.date)}
                      location={event.location?.venue || "TBD"}
                      city={event.location?.city || "Unknown"}
                      time={`${event.startTime} - ${event.endTime}`}
                      people={`${event.volunteerSlots} slots`}
                      role={
                        event.roles?.length > 0
                          ? event.roles.join(", ")
                          : "Volunteer"
                      }
                      rating={event.rating || "New"}
                      about={event.description || "No Description"}
                      category={event.category || "Uncategorized"}
                      hostedBy={
                        event.organizationId?.fullName || "Unknown Host"
                      }
                      benefits={
                        event.certificateEnabled
                          ? "Certificate Provided"
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
                      fontFamily: FONTS.medium,
                    }}
                  >
                    No events match your search.
                  </Text>
                )}
              </View>
            ) : (
              <>
                {recentSearches.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.property}>{"Recent Searches"}</Text>
                    <View style={styles.propView}>
                      {recentSearches.map((item, index) => (
                        <SearchListItem
                          key={index}
                          text={item}
                          onSearch={handleSearch}
                          onCancel={handleCancelItem}
                        />
                      ))}
                    </View>
                  </View>
                )}
                <View style={styles.section}>
                  <Text style={styles.property}>{"Popular Categories"}</Text>
                  <View style={styles.propView}>
                    {popularCategories.map((item, index) => (
                      <SearchListItem
                        key={index}
                        text={item}
                        onSearch={handleSearch}
                        onCancel={() =>
                          console.log("Cannot delete fixed categories ")
                        }
                      />
                    ))}
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeview: { padding: 20, backgroundColor: COLORS.background, flex: 1 },
  section: { marginVertical: 20 },
  property: { fontFamily: FONTS.regular, fontSize: 16, color: "#2A2A2A" },
  componentText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.neutral,
    flex: 1,
  },
  propView: {
    backgroundColor: "#9E9E9E0D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default Search;
