import { View, TouchableOpacity, Image, Text } from "react-native";
import React, { useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../utils/Theme/Theme";
import icons from "../../utils/icons/icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Phone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);

  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId:
      "498623551364-7kb135kotuafs0g6mbeeofrqsq3j26ac.apps.googleusercontent.com",
  });

  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(formattedValue);
    if (confirmation._auth._authResult) {
      navigation.navigate("OtpVerify", {
        phoneNumber: formattedValue,
        confirmation: confirmation,
      });
    } else {
      alert("Error");
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const user_sign_in = auth().signInWithCredential(googleCredential);

      await user_sign_in.then((re) => {
        AsyncStorage.setItem("@AuthState", JSON.stringify(re));
        dispatch(setUserDetails(re));
      });
      navigation.navigate("AuthPIN");
    } catch (error) {
      console.log("errorrrr : ", error);
      alert("Login Failed !!!");
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        paddingHorizontal: 25,
      }}
    >
      <View
        style={{
          bottom: 70,
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image
            source={icons.phone_banner}
            style={{
              width: 120,
              height: 120,
            }}
          />
          <Text></Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              ...FONTS.h2,
            }}
          >
            Let's Get Started
          </Text>

          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            We will send an OTP to your mobile number
          </Text>
          <Text></Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
            <PhoneInput
              containerStyle={{
                margin: 0,
                padding: 0,
                height: 53,
              }}
              textInputStyle={{ padding: 0, margin: 0 }}
              ref={phoneInput}
              value={phoneNumber}
              defaultCode="IN"
              layout="first"
              onChangeText={(text) => setPhoneNumber(text)}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
            />
          </View>
          <TouchableOpacity onPress={signInWithPhoneNumber}>
            <View
              style={{
                left: 5,
                width: 53,
                height: 53,
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
        <Text
          style={{
            top: 50,
            justifyContent: "center",
            alignSelf: "center",
            ...FONTS.h3,
            color: COLORS.gray,
            right: 15,
          }}
        >
          OR
        </Text>
        <View
          style={{
            top: 80,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={onGoogleButtonPress}>
            <View
              style={{
                width: 280,
                height: 48,
                borderRadius: 10,
                backgroundColor: "blue",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  left: 2,
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                }}
              >
                <Image
                  source={icons.google_logo}
                  style={{
                    width: 44,
                    height: 44,
                  }}
                />
              </View>
              <Text
                style={{
                  left: 12,
                  fontSize: 24,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Phone;
