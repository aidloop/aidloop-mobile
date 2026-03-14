import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Calendar from "../../assets/images/calendar.svg";
import Confirm from "../../assets/images/Checked.svg";
import Ready from "../../assets/images/conrgrats.svg";
import Event from "../../assets/images/EventNotification.svg";
import Notify from "../../assets/images/notify.svg";
import Read from "../../assets/images/read.svg";
import Update from "../../assets/images/Update.svg";
import ScreenInfo from "../../components/screenInfo";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

const Notification = ({ icon, Head, Details, unread, Date }) => {
  const [read, setRead] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setRead(!read)}
      style={[
        styles.notification,
        read && styles.readnotification,
        // {
        //   borderColor: read ? undefined : "#448AFFA8",
        //   borderWidth: read ? 0 : 1,
        // },
      ]}
    >
      <View>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.notificationHead}>{Head}</Text>
        <Text style={styles.notificationDetail}>{Details}</Text>
        <Text style={styles.notificationDate}>{Date}</Text>
      </View>
      {!read && <Read />}
    </TouchableOpacity>
  );
};

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScreenInfo
        ScreenTitle={"Notifications"}
        subtext={
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTS.regular,
              color: COLORS.white,
              // backgroundColor: "red",
              fontSize: 14,
            }}
          >
            2 unread
          </Text>
        }
        icon={<Notify />}
      />
      <ScrollView
        style={styles.safeview}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Notification
          icon={<Calendar />}
          Head={"Coastal Clean-Up Exercise"}
          Details={"Your Events starts tomorrow at 8:00AM"}
          Date={"2 hrs ago"}
        />
        <Notification
          icon={<Confirm />}
          Head={"Registration Confirmed"}
          Details={"You are registered for Green Lagos Tree Planting."}
          Date={"1 day ago"}
        />
        <Notification
          icon={<Update />}
          Head={"Event Update"}
          Details={
            "The start time for Food Distribution Drive has changed to 10:30 AM."
          }
          Date={"2 days ago"}
        />
        <Notification
          icon={<Ready />}
          Head={"Certificate Ready"}
          Details={"Your certificate for beach cleanup is now available"}
          Date={"3 days ago"}
        />
        <Notification
          icon={<Event />}
          Head={"New Event Near You"}
          Details={
            "Community Health Outreach is happening near you this weekend."
          }
          Date={"4 days ago"}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
  },

  notificationDetail: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    flexWrap: "wrap",
    // overflow: "scroll",
  },

  notificationHead: { fontFamily: FONTS.semibold, fontSize: 20 },
  notificationDate: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#0000007D",
  },
  notification: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    // justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#448AFFA8",
    gap: 10,
    padding: 10,
    marginVertical: 10,
  },

  readnotification: {
    borderWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
});
