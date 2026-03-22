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
        tabBarShowIcon: true,
        swipeEnabled: true,
        tabBarActiveTintColor: COLORS.highlight,
        tabBarInactiveTintColor: COLORS.neutral,

        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FONTS.medium,
          textTransform: "capitalize",
          margin: 0,
          padding: 0,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "green",
          height: 80,
        },

        tabBarStyle: {
          // backgroundColor: "red",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 80,
          paddingBottom: 20,
        },

        tabBarIndicatorStyle: {
          backgroundColor: COLORS.highlight,
          // marginTop: -5,
          paddingBottom: 10,
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
