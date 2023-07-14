import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserDetails, setUserAuth } from "./redux/actions";
import { AuthStateStack, HomeStack } from "./navigation";
import { View } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Spinner } from "native-base";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks",
]);

const InitialScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.fetchUserAuthState.AuthState);

  console.log("state : ", authState);
  const getData = async () => {
    try {
      let result = await AsyncStorage.getItem("@AuthState");
      if (result != null) {
        const detail = JSON.parse(result);
        dispatch(setUserDetails(detail));
        dispatch(setUserAuth(true));
      }
    } catch (error) {
      console.log("error in Async Storage!!!");
    }
  };

  const fetchAuthState = async () => {
    await getData();
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchAuthState();
  }, []);

  useEffect(() => {
    console.log("AuthState :: ", authState);
  }, [authState]);

  return (
    <SafeAreaProvider>
      {isLoaded ? (
        <View width={"100%"} height={"100%"}>
          {authState ? <HomeStack /> : <AuthStateStack />}
        </View>
      ) : (
        <View
          width={"100%"}
          height={"100%"}
          alignContent="center"
          alignItems={"center"}
          display="flex"
          justifyContent={"center"}
        >
          <Spinner size={"lg"} color={"blue.500"} />
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default InitialScreen;
