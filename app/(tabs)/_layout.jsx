import { Tabs } from "expo-router";
import HomeIcon from "../../assets/images/homeicon.svg";
import MyEventsIcon from "../../assets/images/myeventsicon.svg";
import NotificationIcon from "../../assets/images/notificationicon.svg";
import ProfileIcon from "../../assets/images/profileicon.svg";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          paddingTop: 10,
          paddingBottom: 10,
          height: 80,
        },
        tabBarActiveTintColor: COLORS.highlight,
        tabBarInactiveTintColor: COLORS.neutral,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: FONTS.medium,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myevents"
        options={{
          title: "My Events",
          tabBarIcon: ({ color }) => (
            <MyEventsIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <NotificationIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={24} height={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
