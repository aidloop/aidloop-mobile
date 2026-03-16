import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Privacy from "../assets/images/flat-color-icons_privacy.svg";
import Help from "../assets/images/ic_sharp-help.svg";
import Logout from "../assets/images/line-md_logout.svg";
import Conditions from "../assets/images/material-symbols_policy-rounded.svg";
import Notification from "../assets/images/SettingsNotification.svg";
import ScreenInfo from "../components/screenInfo";
import Row from "../components/SettingsOptions";
import { COLORS } from "../constants/colors";

export default function Settings() {
  const rows = [
    {
      id: 1,
      icon: <Notification width={30} height={30} />,
      title: "Notifications",
      subtitle: "Manage notifications and preferences",
      onpress: () => {
        router.push("/notification");
      },
    },
    {
      id: 2,
      title: "Privacy & Security",
      icon: <Privacy width={30} height={30} />,
      subtitle: "Update password and security settings",
    },
    {
      id: 3,
      icon: <Conditions width={30} height={30} />,
      title: "Terms & Conditions",
      subtitle: "View platform policies",
    },
    {
      id: 4,
      icon: <Help width={30} height={30} />,
      title: "Help & Support",
      subtitle: "Contact support or view FAQs",
    },
    {
      id: 5,
      icon: <Logout width={30} height={30} color={"#F44336"} />,
      title: "Logout",
      logout: true,
      subtitle: "Sign out of your account",
    },
  ];
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScreenInfo ScreenTitle={"Settings"} />
      <ScrollView style={{ padding: 20 }}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
