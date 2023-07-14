import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  All,
  Defi,
  Metaverse,
  TopGainers,
  TopLosers,
  Watchlist,
} from "./MarketTabs";

const Tab = createMaterialTopTabNavigator();

const Market = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: "blue",
          height: 2,
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
      }}
      // sceneContainerStyle={{backgroundColor: 'white'}}
    >
      <Tab.Screen name="All" component={All} />
      <Tab.Screen name="Watchlist" component={Watchlist} />
      <Tab.Screen name="TopGainers" component={TopGainers} />
      <Tab.Screen name="TopLosers" component={TopLosers} />
      <Tab.Screen name="Defi" component={Defi} />
      <Tab.Screen name="Metaverse" component={Metaverse} />
    </Tab.Navigator>
  );
};

export default Market;
