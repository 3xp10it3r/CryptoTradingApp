import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const AuthStateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="stack"
    >
      <Stack.Screen name="stack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default AuthStateStack;
