import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import this
import HomeIcon from "../../assets/images/homeicon.svg";
import MyEventsIcon from "../../assets/images/myeventsicon.svg";
import NotificationIcon from "../../assets/images/notificationicon.svg";
import ProfileIcon from "../../assets/images/profileicon.svg";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTabs = withLayoutContext(Navigator);

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 60 + insets.bottom;

  return (
    <MaterialTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarShowIcon: true,
        swipeEnabled: true,
        tabBarActiveTintColor: COLORS.highlight,
        tabBarInactiveTintColor: COLORS.neutral,

        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FONTS.medium,
          textTransform: "capitalize",
          margin: 0,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: TAB_BAR_HEIGHT,
        },

        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: TAB_BAR_HEIGHT,
          paddingBottom: insets.bottom > 0 ? insets.bottom / 2 : 0,
        },

        tabBarIndicatorStyle: {
          display: "none",
        },
      }}
    >
      <MaterialTabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <MaterialTabs.Screen
        name="myevents"
        options={{
          title: "My Events",
          tabBarIcon: ({ color }) => (
            <MyEventsIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <MaterialTabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <NotificationIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <MaterialTabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={24} height={24} color={color} />
          ),
        }}
      />
    </MaterialTabs>
  );
}
