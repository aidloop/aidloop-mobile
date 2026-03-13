import { Tabs } from "expo-router";
import { View } from "react-native";
import Discover from "../../assets/images/Discover.svg";
import Events from "../../assets/images/Events.svg";
import Home from "../../assets/images/Home.svg";
import Profile from "../../assets/images/Profile.svg";
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
        tabBarActiveTintColor: COLORS.highlight,
        tabBarInactiveTintColor: COLORS.primary,

        tabBarIconStyle: { marginBottom: 4 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Icon focused={focused} icon={<Home width={30} color={color} />} />
          ),
        }}
      />
      <Tabs.Screen
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
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              focused={focused}
              icon={<Profile width={30} color={color} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
