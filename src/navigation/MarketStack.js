import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Market } from "../screens";
import { Box, Text } from "native-base";

const Stack = createNativeStackNavigator();

const HeaderTitle = () => {
  return (
    <Box>
      <Text fontSize="2xl">
        Market is <Text color="green.500">up 3.11%</Text>
        <Text fontSize="sm" color="coolGray.500">
          {" "}
          in last 24h
        </Text>
      </Text>
    </Box>
  );
};

const MarketStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerLeft: (props) => <HeaderTitle {...props} />,
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="MARKET"
        component={Market}
        options={{
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MarketStack;
