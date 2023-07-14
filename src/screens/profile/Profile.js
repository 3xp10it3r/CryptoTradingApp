import {
  Avatar,
  Box,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { FONTS } from "../../utils/Theme/Theme";
import { icons } from "../../utils/icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserAuth } from "../../redux/actions";
import { ACTION_TYPE } from "../../components/constants/Constants";
import { launchImageLibrary } from "react-native-image-picker";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState();
  const user = useSelector((state) => state.FetchUserDetails.user);
  const uid = user.user.uid;
  const userImage = useSelector((state) => state.FetchUserDetails.userImage);

  const signOutUser = async () => {
    await AsyncStorage.removeItem("@AuthState");
    dispatch(setUserAuth(false));
    dispatch(setUserDetails([]));
  };
  useEffect(() => {
    setPhoto(user.user.photoURL);
  }, []);

  const selectPhotoFromGallery = async () => {
    let result = await launchImageLibrary({
      maxHeight: 300,
      maxWidth: 300,
      quality: 0.5,
      includeBase64: true,
    });
    if (!result.didCancel) {
      let image = result.assets[0].base64;
      dispatch({ type: ACTION_TYPE.GET_USER_IMAGE, payload: { image, uid } });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignItems={"center"}>
          <TouchableOpacity onPress={() => selectPhotoFromGallery()}>
            {userImage === "" ? (
              <Avatar
                source={
                  photo === null
                    ? icons.profile_pic
                    : {
                        uri: photo,
                      }
                }
                size={20}
              />
            ) : (
              <Avatar
                source={
                  photo === null
                    ? icons.profile_pic
                    : {
                        uri: `data:image/gif;base64,${userImage}`,
                      }
                }
                size={20}
              />
            )}
          </TouchableOpacity>
          <Text mt={1}>KYC verified</Text>
          <Text {...FONTS.body2} bold letterSpacing={1} mt={2}>
            {user.user.displayName}
          </Text>
          <Text my={2}>{user.user.phoneNumber}</Text>
        </Box>
        <Box bg={"white"} mb={3}>
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="account-box-outline" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  User Verification
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Complete your KYC to buy,sell and
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Withdraw
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Divider />
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="bank" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  Bank Details
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  This account is used to facilitate all
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  your deposits and withdrawals
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Divider />
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="history" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  History
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  All your transaction on CoinCrypto
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  app
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <Box bg={"white"} mb={3}>
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="bell-plus-outline" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  Price Alerts
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Create customised price alerts
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Divider />
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="bell-badge-outline" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  Watchlist & portfolio Price Alert
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Get price alerts for all coins on
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  your watchlist and portfolio
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate("Rewards")}>
          <Box bg={"white"} mb={3}>
            <Box mx={5}>
              <HStack alignItems={"center"} my={3} space={5}>
                <MaterialCommunityIcons
                  name="account-convert-outline"
                  size={28}
                />
                <VStack>
                  <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                    Refer & Earn
                  </Text>
                  <Text {...FONTS.body3} color="coolGray.500">
                    Get $50 BTC when your friend
                  </Text>
                  <Text {...FONTS.body3} color="coolGray.500">
                    completes KYC & $100 BTC when they...
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
        </TouchableOpacity>
        <Box bg={"white"} mb={3}>
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="wallet-giftcard" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  Redeem Gift Voucher
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Got a voucher? Redeem here
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <Box bg={"white"} mb={3}>
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="face-agent" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  Help & Support
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Create a ticket and we will contact you
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <Box bg={"white"} mb={3}>
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="star-outline" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  Rate Us
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  Tell us what you think
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <Box bg={"white"} mb={3}>
          <Box mx={5}>
            <HStack alignItems={"center"} my={3} space={5}>
              <MaterialCommunityIcons name="alpha-c-box-outline" size={28} />
              <VStack>
                <Text {...FONTS.body3} fontSize={"lg"} mb={2}>
                  About CryptoApp
                </Text>
                <Text {...FONTS.body3} color="coolGray.500">
                  v1.0.0
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <Box bg={"white"} mb={3}>
          <TouchableOpacity onPress={signOutUser}>
            <Box mx={5}>
              <HStack alignItems={"center"} my={3} space={5}>
                <MaterialCommunityIcons name="power" size={28} />
                <Text color="red.600" fontSize="lg">
                  Logout
                </Text>
              </HStack>
            </Box>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
