import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import OTPTextView from "react-native-otp-textinput";
import icons from "../../utils/icons/icons";
import { FONTS, COLORS } from "../../utils/Theme/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/actions";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);

const OtpVerify = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { phoneNumber, confirmation } = route.params;
  const otpInput = useRef(null);
  const clearText = () => {
    otpInput.current.clear();
  };

  const confirmCode = async () => {
    try {
      const result = await confirmation.confirm(
        otpInput.current.state.otpText.join("").toString()
      );
      AsyncStorage.setItem("@AuthState", JSON.stringify(result));
      dispatch(setUserDetails(result));
      navigation.navigate("AuthPIN");
    } catch (error) {
      alert("Invalid OTP !!!");
      clearText;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          bottom: "11%",
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
          }}
        >
          <Image
            source={icons.otp_icon}
            style={{
              width: 120,
              height: 120,
            }}
          />
        </View>

        <Text></Text>

        <Text
          style={{
            alignSelf: "flex-start",
            bottom: 5,
            left: 25,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Enter OTP
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              ...FONTS.body3,
              left: 25,
              color: COLORS.gray,
            }}
          >
            Please enter the OTP sent to{" "}
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              {phoneNumber}
            </Text>
          </Text>
          <TouchableOpacity
            style={{
              top: 3,
              left: 30,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                color: "#4787ed",
                fontWeight: "bold",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            top: 40,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              left: "8%",
            }}
          >
            <OTPTextView
              ref={otpInput}
              inputCount={6}
              containerStyle={{
                width: 70,
              }}
              textInputStyle={{
                borderRadius: 10,
                borderWidth: 4,
                width: 35,
                height: 48,
              }}
            />
          </View>

          <View
            style={{
              left: "400%",
              top: 4,
            }}
          >
            <TouchableOpacity onPress={confirmCode}>
              <View
                style={{
                  width: 58,
                  height: 48,
                  borderRadius: 10,
                  borderColor: COLORS.black,
                  backgroundColor: "blue",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-right"
                  color={"#fff"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            top: 40,
            width: 100,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              top: 3,
              left: 30,
            }}
            onPress={clearText}
          >
            <Text
              style={{
                color: "#4787ed",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpVerify;
