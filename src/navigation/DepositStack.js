import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DepositINR from "../screens/depositScreen/DepositINR";
import { HStack, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTS } from "../utils/Theme/Theme";

const Stack = createNativeStackNavigator();

const DepositStack = ({ navigation }) => {
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
                  name="arrow-left"
                  color={focused ? "gray" : "black"}
                  size={30}
                />
                <Text
                  ml={5}
                  paddingBottom={1}
                  {...FONTS.h2}
                  bold
                  color={"coolGray.700"}
                >
                  Deposit
                </Text>
              </HStack>
            </Pressable>
          ),
        }}
        name="Deposit"
        component={DepositINR}
      />
    </Stack.Navigator>
  );
};

export default DepositStack;
