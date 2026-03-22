import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import HomeIcon from "../../assets/images/homeicon.svg";
import MyEventsIcon from "../../assets/images/myeventsicon.svg";
import NotificationIcon from "../../assets/images/notificationicon.svg";
import ProfileIcon from "../../assets/images/profileicon.svg";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTabs = withLayoutContext(Navigator);

export default function TabsLayout() {
  return (
    <MaterialTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarShowLabel: true,
        swipeEnabled: true,
        tabBarActiveTintColor: COLORS.highlight,
        tabBarInactiveTintColor: COLORS.neutral,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FONTS.medium,
          textTransform: "none",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 10,
          height: 80,
          paddingBottom: 10,
        },

        tabBarIndicatorStyle: { backgroundColor: "transparent" },
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
