import React from "react";
import { Profile } from "../screens";
import { Home, Portfolio, Rewards } from "../screens";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../utils/Theme/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import MarketStack from "./MarketStack";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        style: {
          position: "absolute",
          height: 100,
          left: 0,
          bottom: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "HOME",
          tabBarInactiveTintColor: COLORS.black,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused, size }) => (
            <IonIcons
              name="home"
              size={size}
              color={focused ? COLORS.primary : COLORS.black}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "PORTFOLIO",
          tabBarInactiveTintColor: COLORS.black,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="poll"
              color={focused ? COLORS.primary : COLORS.black}
              size={size}
            />
          ),
        }}
        name="Portfolio"
        component={Portfolio}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "",
          tabBarInactiveTintColor: COLORS.black,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: -8,
                width: 50,
                height: 50,
                resizeMode: "contain",
                borderRadius: 30,
                backgroundColor: COLORS.primary,
              }}
            >
              <IonIcons
                name="gift-outline"
                size={30}
                color={focused ? COLORS.black : COLORS.white}
              />
            </View>
          ),
        }}
        name="Rewards"
        component={Rewards}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "MARKET",
          tabBarInactiveTintColor: COLORS.black,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="trending-up"
              color={focused ? COLORS.primary : COLORS.black}
              size={size}
            />
          ),
        }}
        name="MarketStack"
        component={MarketStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "PROFILE",
          tabBarInactiveTintColor: COLORS.black,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused, size }) => (
            <IonIcons
              name="person"
              color={focused ? COLORS.primary : COLORS.black}
              size={size}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
