import { Tabs } from "expo-router";
<<<<<<< Updated upstream
import { View } from "react-native";
import Discover from "../../assets/images/Discover.svg";
import Events from "../../assets/images/Events.svg";
import Home from "../../assets/images/Home.svg";
import Profile from "../../assets/images/Profile.svg";
=======
import HomeIcon from "../../assets/images/homeicon.svg";
import MyEventsIcon from "../../assets/images/myeventsicon.svg";
import NotificationIcon from "../../assets/images/notificationicon.svg";
import ProfileIcon from "../../assets/images/profileicon.svg";
>>>>>>> Stashed changes
import { COLORS } from "../../constants/colors";

export default function TabsLayout() {
  const Icon = ({ focused, icon }) => (
    <View
    // style={{
    //   // backgroundColor: focused && "grey",
    //   borderRadius: "50%",
    //   padding: 5,
    // }}
    >
      {/* <View></View> */}
      {icon}
    </View>
  );
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
<<<<<<< Updated upstream
        tabBarActiveTintColor: COLORS.highlight,
        tabBarInactiveTintColor: COLORS.primary,

        tabBarIconStyle: { marginBottom: 4 },
=======
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
          fontFamily: "PoppinsMedium",
          marginTop: 2,
        },
>>>>>>> Stashed changes
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
<<<<<<< Updated upstream
          tabBarIcon: ({ focused, color }) => (
            <Icon focused={focused} icon={<Home width={30} color={color} />} />
=======
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color} />
>>>>>>> Stashed changes
          ),
        }}
      />
      <Tabs.Screen
<<<<<<< Updated upstream
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              focused={focused}
              icon={<Discover width={30} fill={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my event"
        options={{
          title: "My Events",
          tabBarIcon: ({ focused, color }) => (
            <Icon focused={focused} icon={<Events width={30} fill={color} />} />
=======
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
>>>>>>> Stashed changes
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
<<<<<<< Updated upstream
          tabBarIcon: ({ focused, color }) => (
            <Icon
              focused={focused}
              icon={<Profile width={30} color={color} />}
            />
=======
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={24} height={24} color={color} />
>>>>>>> Stashed changes
          ),
        }}
      />
    </Tabs>
  );
}
