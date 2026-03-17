import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const router = useRouter();

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
      title: "Log out",
      logout: true,
      subtitle: "Sign out of your account",
    },
  ];

  return (
    <View style={styles.safeareaview}>
      <View>
        <ScreenInfo
          ScreenTitle={"Profile"}
          icon={
            <TouchableOpacity>
              <Edit color={COLORS.white} />
            </TouchableOpacity>
          }
        />
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingVertical: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dp}>
          <Text style={styles.dptext}>FS</Text>
        </View>
        <View style={{ marginVertical: 10, alignItems: "center", gap: 3 }}>
          <Text style={styles.username}>Favour Shiyanbola</Text>
          <Text style={styles.email}>favour@gmail.com</Text>
          <Pressable style={styles.badge}>
            <Text style={styles.status}>Active Volunteer</Text>
          </Pressable>
        </View>

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
              3
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
          <Pressable style={styles.certPress}>
            <Certificate width={40} height={40} />
            <Text
              style={{
                fontFamily: FONTS.semibold,
                fontSize: 30,
                color: COLORS.primary,
              }}
            >
              3
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
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: COLORS.white,
  },
  dp: {
    backgroundColor: COLORS.primary,
    // width: "30%",
    aspectRatio: "",
    height: 100,
    width: 100,
    // flexDirection: "row",
    // marginTop: 30,
    alignSelf: "center",
    borderRadius: "50%",
    borderColor: "#9E9E9E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  dptext: { fontFamily: FONTS.semibold, color: COLORS.white, fontSize: 40 },
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
    // textAlign: "center"
  },
  email: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    //  textAlign: "center"
  },
  badge: {
    backgroundColor: "#52D17C21",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#52D17CAD",
    borderRadius: 10,
  },

  status: { fontFamily: FONTS.semibold, fontSize: 14, color: "#599F61" },

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
