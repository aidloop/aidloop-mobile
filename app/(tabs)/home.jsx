import { useRouter } from "expo-router";
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
export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaview}>
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
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: { flex: 1, paddingHorizontal: 15 },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  logo: {
    marginTop: 100,
    justifyContent: "center",
    width: 230,
    height: 250,
  },
  btnBackground: {
    backgroundColor: COLORS.primary,
    width: 250,
    borderRadius: 100,
    paddingVertical: 7,
  },
  btnText: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    textAlign: "center",
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
