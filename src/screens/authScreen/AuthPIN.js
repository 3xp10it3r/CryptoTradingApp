import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { COLORS, FONTS } from "../../utils/Theme/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../utils/icons/";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../../redux/actions";

const AuthPIN = ({ navigation }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code == "1234") {
      dispatch(setUserAuth(true));
      navigation.navigate("HomeTabs");
    } else if (code.length == 4) {
      setCode("");
      alert("Invalid Code !!!");
    }
  }, [code]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
      }}
    >
      <SafeAreaView>
        <View
          style={{
            marginTop: "20%",
          }}
        >
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Image
              source={icons.crypto_icon}
              style={{
                width: 70,
                height: 70,
              }}
            />
          </View>
          <Text
            style={{
              alignSelf: "center",
              bottom: 5,
              fontSize: 30,
              fontWeight: "400",
              letterSpacing: 1,
            }}
          >
            Enter your PIN
          </Text>
          <Text
            style={{
              alignSelf: "center",
              ...FONTS.body,
              color: COLORS.gray,
            }}
          >
            Enter the secure PIN to access
          </Text>
          <Text
            style={{
              alignSelf: "center",
              ...FONTS.body,
              color: COLORS.gray,
            }}
          >
            your account.
          </Text>
        </View>
        <View
          style={{
            marginTop: "30%",
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <SmoothPinCodeInput
            placeholder={
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  opacity: 0.3,
                  backgroundColor: "gray",
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "black",
                }}
              ></View>
            }
            maskDelay={0}
            cellSpacing={-8}
            autoFocus
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={code}
            onTextChange={(code) => setCode(code)}
          />

          <TouchableOpacity
            style={{
              alignSelf: "center",
              top: 3,
            }}
            onPress={() => alert("arrange->2143")}
          >
            <Text
              style={{
                color: "#4787ed",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Forgot PIN?
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthPIN;
