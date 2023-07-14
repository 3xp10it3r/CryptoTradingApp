import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HStack, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTS } from "../utils/Theme/Theme";
import { SellCrypto } from "../screens/sellScreen";

const Stack = createNativeStackNavigator();

const SellStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
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
                  Sell{" "}
                  <Text textTransform={"uppercase"}>
                    {route?.params?.details?.symbol}
                  </Text>
                </Text>
              </HStack>
            </Pressable>
          ),
        }}
        name="Sell"
        component={SellCrypto}
        initialParams={route.params}
      />
    </Stack.Navigator>
  );
};

export default SellStack;
