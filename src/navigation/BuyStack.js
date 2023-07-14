import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HStack, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTS } from "../utils/Theme/Theme";
import { BuyCrypto } from "../screens/buyScreen";

const Stack = createNativeStackNavigator();

const BuyStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "",
          headerTitle: "",
          headerLeft: ({ focused }) => (
            <Pressable onPress={() => navigation.goBack()}>
              <HStack>
                <MaterialCommunityIcons
                  name="close"
                  color={focused ? "gray" : "black"}
                  size={30}
                />
                <Text
                  ml={"110"}
                  paddingBottom={1}
                  {...FONTS.h2}
                  bold
                  color={"coolGray.700"}
                >
                  Buy{" "}
                  <Text textTransform={"uppercase"}>{route.params.symbol}</Text>
                </Text>
              </HStack>
            </Pressable>
          ),
        }}
        name="Buy"
        component={BuyCrypto}
        initialParams={{
          current_price: route.params.current_price,
          details: route.params.details,
        }}
      />
    </Stack.Navigator>
  );
};

export default BuyStack;
