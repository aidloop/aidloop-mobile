import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/eventcard";
import Header from "../../components/header";
import SearchBar from "../../components/searchbar";

import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView style={styles.scrollview}>
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

        <EventCard
          image={require("../../assets/images/eventimage-1.png")}
          status="Verified"
          title="Beach Cleanup"
          date="June 14, 2026"
          location="Tarkwa Bay"
          time="9:00 AM - 1:00 PM"
          people="12/20 Slots"
          role="Co-Worker"
          rating="4.9"
        />
        <EventCard
          image={require("../../assets/images/eventimage-3.jpg")}
          status="Verified"
          title="Community Food Drive"
          date="July 2, 2026"
          location="Yaba, Lagos"
          time="10:00 AM - 3:00 PM"
          people="85/120 Slots"
          role="Volunteer"
          rating="4.7"
        />
        <EventCard
          image={require("../../assets/images/eventimage-2.jpg")}
          status="Verified"
          title="Tree Planting Initiative"
          date="August 10, 2026"
          location="Lekki Conservation Centre"
          time="8:00 AM - 12:00 PM"
          people="45/60 Slots"
          role="Team Lead"
          rating="4.8"
        />
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
