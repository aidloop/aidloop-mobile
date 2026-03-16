import { useState } from "react";
import {
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
import { completedEvents, upcomingEvents } from "../../data/myevents";

export default function MyEventsScreen() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const events = activeTab === "upcoming" ? upcomingEvents : completedEvents;

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
      >
        {events.map((event) => (
          <MyEventsCard
            key={event.id}
            image={event.image}
            verification={event.verification}
            title={event.title}
            date={event.date}
            location={event.location}
            time={event.time}
            people={event.people}
            role={event.role}
            rating={event.rating}
            hostedBy={event.hostedBy}
            benefits={event.benefits}
            about={event.about}
            category={event.category}
            status={event.status}
            volunteerRequirements={event.volunteerRequirements}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 25,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },

  tabText: {
    fontSize: 24,
    fontFamily: FONTS.semibold,
    color: "#9E9E9E99",
  },

  activeText: {
    color: COLORS.primary,
  },

  scrollView: {
    paddingHorizontal: 20,
  },
});
