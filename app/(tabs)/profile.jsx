import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../../api/api";
import { logout } from "../../api/auth";
import Notification from "../../assets/images/Notification.svg";
import Certificate from "../../assets/images/certificate.svg";
import Calendar from "../../assets/images/dateicon.svg";
import Edit from "../../assets/images/edit.svg";
import Signout from "../../assets/images/line-md_logout.svg";
import Settings from "../../assets/images/settings.svg";
import Row from "../../components/ProfileOptions";
import ScreenInfo from "../../components/screenInfo";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

export default function ProfileScreen() {
  const [user, setUser] = useState({});
  // NEW STATE: Store the counters
  const [stats, setStats] = useState({ attended: 0, certificates: 0 });
  const [loading, setLoading] = useState(true);
  const [loggingout, setLoggingout] = useState(false);
  const router = useRouter();

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      const userResponse = await API.get("/user/me");
      const userData = userResponse.data?.data || userResponse.data;
      setUser(userData);

      const regResponse = await API.get("/applications/registrations/me");
      const registrations = regResponse.data?.data || regResponse.data || [];

      const attendedEvents = registrations.filter(
        (reg) => reg.status === "attended",
      );

      const earnedCertificates = attendedEvents.filter(
        (reg) => reg.eventId?.certificateEnabled === true,
      );

      setStats({
        attended: attendedEvents.length,
        certificates: earnedCertificates.length,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingout(true);
      await logout();
      Alert.alert("Logout Successful", "You have been securely logged out ");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Logout Failed", error.message || "An error occurred");
    } finally {
      setLoggingout(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const rows = [
    {
      id: 1,
      icon: <Calendar width={20} height={20} color={"#448AFF"} />,
      title: "My Events",
      subtitle: "View upcoming and completed events",
      onpress: () => {
        router.push("/myevents");
      },
    },
    {
      id: 2,
      icon: <Certificate width={20} height={20} color={"#448AFF"} />,
      title: "Certificates",
      subtitle: "View and download your certificates",
      onpress: () => {
        router.push("/myevents");
      },
    },
    {
      id: 3,
      icon: <Notification width={20} height={20} color={"#448AFF"} />,
      title: "Notifications",
      subtitle: "View updates and reminders",
      onpress: () => {
        router.push("/notification");
      },
    },
    {
      id: 4,
      icon: <Settings width={20} height={20} color={"#448AFF"} />,
      title: "Settings",
      subtitle: "View updates and reminders",
      onpress: () => {
        router.push("/settings");
      },
    },
    {
      id: 5,
      icon: <Signout width={20} height={20} color={"#448AFF"} />,
      title: loggingout ? "Logging Out" : "Log Out",
      logout: true,
      subtitle: loggingout ? "Please Hold on" : "Sign out of your account",
      onpress: () => {
        Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
          { text: "Yes", onPress: () => handleLogout() },
          { text: "No", style: "cancel" },
        ]);
      },
    },
  ];

  const name = user?.fullName || "User";
  const userName = name
    .split(/([ -])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const email = user?.email || "user@email.com";
  const isActive = user?.isActive ? "Active" : "" || "Undefined";
  const role = user?.role || "Volunteer";
  const image = user?.avatar
    ? { uri: user.avatar }
    : require("../../assets/images/default.png");

  return (
    <View style={styles.safeareaview}>
      <View>
        <ScreenInfo
          ScreenTitle={"Profile"}
          icon={
            <TouchableOpacity onPress={() => router.push("/editProfile")}>
              <Edit color={COLORS.white} width={25} height={25} />
            </TouchableOpacity>
          }
        />
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingVertical: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {!loading ? (
          <View>
            <View style={styles.dp}>
              <Image source={image} style={styles.dpimage} />
            </View>
            <View style={{ marginVertical: 10, alignItems: "center", gap: 3 }}>
              <Text style={styles.username}>{userName}</Text>
              <Text style={styles.email}>{email}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable style={styles.badge}>
                  <Text style={styles.status}>{`${isActive} ${role} `}</Text>
                </Pressable>
                <TouchableOpacity onPress={fetchProfileData}>
                  <MaterialIcons
                    name="refresh"
                    size={20}
                    color={COLORS.neutral}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: 50 }}
          />
        )}

        <View style={styles.certView}>
          <Pressable style={styles.certPress}>
            <Certificate width={40} height={40} />
            <Text
              style={{
                fontFamily: FONTS.semibold,
                fontSize: 30,
                color: COLORS.primary,
              }}
            >
              {loading ? "-" : stats.attended}
            </Text>
            <View>
              <Text style={{ fontFamily: FONTS.regular, fontSize: 12 }}>
                Events
              </Text>
              <Text style={{ fontFamily: FONTS.regular, fontSize: 12 }}>
                Attended
              </Text>
            </View>
          </Pressable>
          <Pressable style={styles.certPress}>
            <Certificate width={40} height={40} />
            <Text
              style={{
                fontFamily: FONTS.semibold,
                fontSize: 30,
                color: COLORS.primary,
              }}
            >
              {loading ? "-" : stats.certificates}
            </Text>
            <View>
              <Text style={{ fontFamily: FONTS.regular, fontSize: 12 }}>
                Certificate
              </Text>
              <Text style={{ fontFamily: FONTS.regular, fontSize: 12 }}>
                Earned
              </Text>
            </View>
          </Pressable>
        </View>

        <View>
          {rows.map((item) => (
            <Row
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              logout={item.logout}
              onPress={item.onpress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  dp: {
    backgroundColor: COLORS.primary,
    height: 167,
    width: 167,
    alignSelf: "center",
    borderRadius: 83.5,
    borderColor: "#9E9E9E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    overflow: "hidden",
  },
  dpimage: { width: "100%", height: "100%", resizeMode: "cover" },
  text: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: 24,
    color: COLORS.black,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btntext: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: 24,
    color: COLORS.white,
    textAlign: "center",
  },
  username: {
    fontFamily: FONTS.semibold,
    fontSize: 20,
  },
  email: {
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
  badge: {
    backgroundColor: "#52D17C21",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#52D17CAD",
    borderRadius: 10,
  },
  status: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: "#599F61",
    textTransform: "capitalize",
  },
  certView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  certPress: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    padding: 10,
    gap: 5,
    borderRadius: 10,
    height: 78,
  },
});
