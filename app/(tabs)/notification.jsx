import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import API from "../../api/api";
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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const response = await API.get("/notifications");
      const data = response.data?.data || response.data || [];

      const sortedData = data.sort(
        (old, recent) => new Date(recent.createdAt) - new Date(old.createdAt),
      );
      setNotifications(sortedData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  }, []);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const toggleReadStatus = async (id, currentStatus) => {
    if (currentStatus) return;

    setNotifications((prevNotifs) =>
      prevNotifs.map((notif) =>
        notif._id === id ? { ...notif, isRead: true } : notif,
      ),
    );

    try {
      await API.patch(`/notifications/${id}/read`);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", `${error.response.data.message}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIconForType = (type) => {
    switch (type) {
      case "registration":
        return <Confirm />;
      case "certificate":
        return <Ready />;
      case "event_update":
      case "cancellation":
        return <Update />;
      default:
        return <Event />;
    }
  };

  const getButtonForType = (type, dataPayload) => {
    if (type === "certificate") {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/certificate",
              params: { regId: dataPayload?.registrationId },
            })
          }
        >
          <Text style={styles.btnText}>Download it right now</Text>
          <Download />
        </TouchableOpacity>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ScreenInfo ScreenTitle={"Notifications"} icon={<Notify />} />
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 50 }}
        />
      </View>
    );
  }

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {notifications.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              fontFamily: FONTS.medium,
              color: COLORS.neutral,
            }}
          >
            No notifications yet.
          </Text>
        ) : (
          notifications.map((item) => (
            <Notification
              key={item._id}
              icon={getIconForType(item.type)}
              Head={item.title}
              Details={item.message}
              Date={formatDate(item.createdAt)}
              button={getButtonForType(item.type, item.data)}
              isRead={item.isRead}
              onToggle={() => toggleReadStatus(item._id, item.isRead)}
            />
          ))
        )}
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
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#448AFFA8",
    gap: 10,
    padding: 10,
    marginVertical: 10,
  },
  readnotification: {
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
