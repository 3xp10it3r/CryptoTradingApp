import React from "react";
import {
  Text,
  Box,
  Image,
  HStack,
  VStack,
  Button,
  Pressable,
  ScrollView,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../utils/icons";
import { COLORS, FONTS } from "../../utils/Theme/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScratchCard from "../../components/common/ScratchCard";

const Rewards = () => {
  return (
    <SafeAreaView
      style={
        {
          // backgroundColor: 'blue',
        }
      }
    >
      <ScrollView>
        <Box height={"100%"} bg="coolGray.100">
          <Image
            source={icons.banner_icon}
            alt="rewardBanner"
            size={56}
            width="100%"
            resizeMode="cover"
            position={"absolute"}
          />
          <HStack justifyContent={"space-between"} mx={5}>
            <VStack space={2} mt={10}>
              <Text {...FONTS.body3} color="white" opacity={0.7}>
                Total Rewards Earned
              </Text>
              <Text {...FONTS.h1} bold color={"white"}>
                ₹0
              </Text>
            </VStack>
            <VStack>
              <Image
                source={icons.gift_icon}
                alt="Gift icon"
                size={40}
                resizeMode="contain"
              />
            </VStack>
          </HStack>
          <Box
            bg={"white"}
            height={72}
            width="90%"
            mx={"5%"}
            mt={-5}
            rounded="lg"
            alignContent={"center"}
          >
            <Box px={5} pt={5} pb={2}>
              <HStack
                justifyContent={"space-between"}
                alignItems="center"
                mb={3}
              >
                <Text {...FONTS.body2} fontSize="lg">
                  Refer & Earn ₹150 BTC
                </Text>
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  size={26}
                  color="#3f00ff"
                />
              </HStack>
              <Text fontSize={"sm"} color="coolGray.600" opacity={0.8}>
                Get ₹50 BTC when your friend completes KYC
              </Text>
              <Text fontSize={"sm"} color="coolGray.600" opacity={0.8}>
                & ₹100 BTC when they buy their first crypto
              </Text>
              <Button mt={5} mb={3} colorScheme="green">
                <HStack space={1}>
                  <Image
                    source={icons.whatsapp_icon}
                    alt="whatsapp icon"
                    size={22}
                  />
                  <Text {...FONTS.body3} fontSize="lg" bold color={"white"}>
                    Invite On WhatsApp
                  </Text>
                </HStack>
              </Button>
              <Button
                variant={"outline"}
                borderColor={COLORS.primary}
                borderWidth={1.3}
                colorScheme="gray"
              >
                <Text
                  {...FONTS.body3}
                  fontSize="lg"
                  bold
                  color={COLORS.primary}
                >
                  Invite contact
                </Text>
              </Button>
            </Box>
            <Box px={3} alignItems="center">
              <Text {...FONTS.body4} color={"coolGray.400"}>
                Our top referrer earned ₹2,20,050 worth of free BTC
              </Text>
              <Pressable mt={3}>
                <Text color={COLORS.primary}>Terms and conditions</Text>
              </Pressable>
            </Box>
          </Box>
          <Box m={5}>
            <Text {...FONTS.body2} fontSize="xl">
              Rewards
            </Text>
          </Box>
          <Box ml={5}>
            <ScratchCard />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rewards;
