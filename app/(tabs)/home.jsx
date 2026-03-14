import { useRouter } from "expo-router";
<<<<<<< Updated upstream
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Filter from "../../assets/images/Filter.svg";
import Notification from "../../assets/images/Notification.svg";
import Search from "../../assets/images/Seacrh.svg";
import EventCards from "../../components/EventCards";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
const Input = ({ InputText, placeholder, icon, icon2, ...props }) => {
  return (
    <View style={styles.input}>
      <View style={styles.searchstyle}>
        <View style={styles.searchIcon}>{icon}</View>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral}
          {...props}
        />
        <TouchableOpacity>{icon2}</TouchableOpacity>
      </View>
    </View>
  );
};
=======
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/eventcard";
import Header from "../../components/header";
import SearchBar from "../../components/searchbar";

import { COLORS } from "../../constants/colors";

>>>>>>> Stashed changes
export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
<<<<<<< Updated upstream
      <View style={styles.topBar}>
        <Text style={styles.topText}>AIDLoop</Text>
        <TouchableOpacity>
          <Notification
            height={27}
            width={24}
            color={COLORS.primary}
            style={
              {
                // backgroundColor: "red",
              }
            }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Notification
            height={27}
            width={24}
            color={COLORS.primary}
            style={
              {
                // backgroundColor: "red",
              }
            }
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Input
            icon={<Search />}
            placeholder={"Search Events"}
            icon2={<Filter />}
          />
        </View>
        <EventCards
          image={
            <Image
              source={require("../../assets/images/image 2.png")}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          }
          eventName={"Beach Cleanup"}
          eventDate={"June 14"}
          eventTime={"9:00 AM - 1:00 PM"}
          eventLocation={"Tarkwa Bay"}
          eventRatings={"4.9"}
          eventStatus={"Co-Worker"}
          eventSlots={"12/20 Slots"}
        />
        <EventCards
          image={
            <Image
              source={require("../../assets/images/splash-image.png")}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          }
          eventName={"Beach Cleanup"}
          eventDate={"June 14"}
          eventTime={"9:00 AM - 1:00 PM"}
          eventLocation={"Tarkwa Bay"}
          eventRatings={"4.9"}
          eventStatus={"Co-Worker"}
          eventSlots={"12/20 Slots"}
=======
      <ScrollView style={styles.scrollview}>
        <Header />
        <SearchBar />

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
>>>>>>> Stashed changes
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
  safeareaview: { flex: 1, paddingHorizontal: 15 },
  container: {
=======
  safeareaview: { flex: 1, backgroundColor: COLORS.white },
  scrollview: {
>>>>>>> Stashed changes
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  topBar: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
    // backgroundColor: COLORS.highlight,
    alignItems: "center",
  },

  topText: {
    flex: 1,
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
    fontSize: 28,
  },

  searchInput: {
    borderColor: COLORS.neutral,
    borderWidth: 1,
    borderRadius: 12,
    height: 54,
    // width: "85%",
    flex: 1,
    paddingHorizontal: 45,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.primary,
  },

  searchstyle: { flexDirection: "row", alignItems: "center", gap: 10 },
  searchIcon: { position: "absolute", left: 10 },

  input: { marginBottom: 20 },
});
