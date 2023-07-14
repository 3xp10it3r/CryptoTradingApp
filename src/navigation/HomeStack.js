import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./HomeTabs";
import BuyStack from "./BuyStack";
import DepositStack from "./DepositStack";
import SellStack from "./SellStack";
import CryptoDetailsStack from "./CryptoDetailsStack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeTabs"
    >
      {/* > */}
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="DepositStack" component={DepositStack} />
      <Stack.Screen name="CryptoDetailsStack" component={CryptoDetailsStack} />
      <Stack.Screen name="BuyStack" component={BuyStack} />
      <Stack.Screen name="SellStack" component={SellStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
