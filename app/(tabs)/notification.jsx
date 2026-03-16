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
import Download from "../../assets/images/quill_download.svg";
import Read from "../../assets/images/read.svg";
import Update from "../../assets/images/Update.svg";
import ScreenInfo from "../../components/screenInfo";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

const Notification = ({
  icon,
  Head,
  Details,
  button,
  Date,
  isRead,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.notification, isRead && styles.readnotification]}
    >
      <View>{icon}</View>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={styles.notificationHead}>{Head}</Text>
        <Text style={styles.notificationDetail}>{Details}</Text>
        {button && button}
        <Text style={styles.notificationDate}>{Date}</Text>
      </View>
      {!isRead && <Read />}
    </TouchableOpacity>
  );
};

export default function NotificationScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: <Calendar />,
      head: "Coastal Clean-Up Exercise",
      details: "Your Events starts tomorrow at 8:00AM",
      date: "2 hrs ago",
      isRead: false,
    },
    {
      id: 2,
      icon: <Confirm />,
      head: "Registration Confirmed",
      details: "You are registered for Green Lagos Tree Planting.",
      date: "1 day ago",
      isRead: false,
    },
    {
      id: 3,
      icon: <Update />,
      head: "Event Update",
      details:
        "The start time for Food Distribution Drive has changed to 10:30 AM.",
      date: "2 days ago",
      isRead: true,
    },
    {
      id: 4,
      icon: <Ready />,
      head: "Certificate Ready",
      details: "Your certificate for beach cleanup is now available",
      date: "3 days ago",
      isRead: true,
      button: (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Download it right now</Text>
          <Download />
        </TouchableOpacity>
      ),
    },
    {
      id: 5,
      icon: <Event />,
      head: "New Event Near You",
      details: "Community Health Outreach is happening near you this weekend.",
      date: "4 days ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((item) => !item.isRead).length; //this counts the total number of unread notifications

  // Function to toggle a specific notification's read state
  const toggleReadStatus = (id) => {
    setNotifications((prevNotifs) =>
      prevNotifs.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif,
      ),
    );
  };

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
            {unreadCount} unread
          </Text>
        }
        icon={<Notify />}
      />
      <ScrollView
        style={styles.safeview}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((item) => (
          <Notification
            key={item.id}
            icon={item.icon}
            Head={item.head}
            Details={item.details}
            Date={item.date}
            button={item.button}
            isRead={item.isRead}
            onToggle={() => toggleReadStatus(item.id)}
          />
        ))}
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
    // borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#1F3A5F66",
    alignSelf: "flex-start",
    padding: 10,
    borderWidth: 1,
    borderColor: "#448AFF8F",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  btnText: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.primary },
});
