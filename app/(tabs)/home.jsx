import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/eventcard";
import Header from "../../components/header";
import SearchBar from "../../components/searchbar";
import { events } from "../../data/events";

import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  const router = useRouter();

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
        {/* <SearchBar /> */}

        {events.map((event) => (
          <EventCard
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
            about={event.about}
            category={event.category}
            hostedBy={event.hostedBy}
            benefits={event.benefits}
            volunteerRequirements={event.volunteerRequirements}
          />
        ))}
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
