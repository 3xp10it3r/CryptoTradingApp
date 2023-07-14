import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS, FONTS } from "../../utils/Theme/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { icons } from "../../utils/icons";
import { Switch } from "native-base";
import MyCurrencies from "../../components/common/MyCurrencies";
import { useSelector } from "react-redux";

const Portfolio = ({ navigation }) => {
  const Toast = useToast();
  const [isCheckedToast, setIsCheckedToast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchedBalance = useSelector((state) => state.FetchUserDetails.balance);

  const your_currencies = useSelector(
    (state) => state.FetchUserDetails.your_currencies
  );

  const InvestedValue = your_currencies.reduce(function (sum, current) {
    return sum + Number(current.buyedCoinAmount);
  }, 0);

  const CurrentValue = your_currencies.reduce(function (sum, current) {
    return (
      sum +
      Number(current.buyedCoinAmount) +
      (current.buyedCoinAmount * current.price_change_percentage_24h) / 100
    );
  }, 0);

  const GainOrLoss = ((CurrentValue - InvestedValue) / InvestedValue) * 100;

  return (
    <SafeAreaView style={{ backgroundColor: "white", marginHorizontal: 2 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack mx={2} justifyContent="space-between" ml={4} mb={5}>
          <Text mt={2} fontSize={"2xl"} letterSpacing={0.5} fontWeight={400}>
            Portfolio
          </Text>
          <Button
            bg="white"
            _text={{
              fontWeight: "bold",
              ...FONTS.body2,
              color: "blue",
            }}
            leftIcon={
              <MaterialCommunityIcons name="swap-horizontal" size={28} />
            }
            colorScheme="rgba(2, 82, 242,0.1)"
          >
            <Text {...FONTS.body2} color="#3f00ff">
              Orders
            </Text>
          </Button>
        </HStack>
        <Box marginX={2} marginBottom={2} ml={4}>
          <HStack justifyContent={"space-between"} mr={5}>
            <VStack>
              <Text fontSize={"sm"} color={"coolGray.500"}>
                Current value
              </Text>
              <Text fontSize={"lg"} fontWeight={400} letterSpacing={0.5}>
                ₹{Number(parseFloat(CurrentValue).toFixed(2)).toLocaleString()}
              </Text>
            </VStack>
            <Divider orientation="vertical" />
            <VStack>
              <Text fontSize={"sm"} color={"coolGray.500"}>
                Invested value
              </Text>
              <Text fontSize={"lg"} fontWeight={400} letterSpacing={0.5}>
                ₹{Number(InvestedValue.toFixed(2)).toLocaleString()}
              </Text>
            </VStack>
            <Divider orientation="vertical" />
            <VStack>
              <Text fontSize={"sm"} color={"coolGray.500"}>
                Gain/Loss
              </Text>

              <HStack>
                <Box py={1}>
                  <MaterialCommunityIcons
                    name={GainOrLoss < 0 ? "menu-down" : "menu-up"}
                    color={GainOrLoss < 0 ? "red" : "green"}
                    size={20}
                  />
                </Box>
                {Number.isNaN(Math.abs(parseFloat(GainOrLoss).toFixed(2))) ? (
                  <Text
                    fontSize={"lg"}
                    fontWeight={400}
                    letterSpacing={0.5}
                    color={GainOrLoss < 0 ? "red.500" : "green.600"}
                  >
                    {0}%
                  </Text>
                ) : (
                  <Text
                    fontSize={"xl"}
                    fontWeight={500}
                    letterSpacing={0.5}
                    color={GainOrLoss < 0 ? "red.500" : "green.600"}
                  >
                    {Math.abs(parseFloat(GainOrLoss).toFixed(2))}%
                  </Text>
                )}
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <Box height={"100%"} bg="coolGray.100">
          <Box bg="white" m={3} my={5}>
            <Button
              height={24}
              bg="blue.100"
              colorScheme="rgba(2, 82, 242,0.3)"
              onPress={() => navigation.navigate("DepositStack")}
            >
              <HStack
                width={"90%"}
                justifyContent={"space-between"}
                alignItems="center"
              >
                <HStack marginLeft={2}>
                  <Image
                    source={icons.wallet_icon}
                    height={12}
                    width={12}
                    alt="wallet"
                  />
                  <VStack ml={4}>
                    <Text fontSize={"md"} color="coolGray.500">
                      Available balance
                    </Text>
                    <Text fontSize={21} letterSpacing={1} fontWeight={500}>
                      ₹{Number(fetchedBalance.toFixed(2)).toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
                <MaterialCommunityIcons name="chevron-right" size={26} />
              </HStack>
            </Button>
            <Button
              bg="white"
              colorScheme="rgba(2, 82, 242,0.3)"
              onPress={() => navigation.navigate("DepositStack")}
            >
              <Text
                fontSize={15}
                fontWeight={600}
                color="#3f00ff"
                letterSpacing={1}
              >
                DEPOSIT INR
              </Text>
            </Button>
          </Box>

          <Box my={2} rounded="lg" mx={2} bg="#fff">
            <HStack
              justifyContent={"space-between"}
              ml={2}
              p={1}
              alignItems="center"
            >
              <Text fontSize={16} color="coolGray.700" letterSpacing={0.5}>
                Portfolio price alert
              </Text>
              <Switch
                isChecked={isCheckedToast}
                colorScheme="blue"
                onChange={() => {
                  setIsCheckedToast(!isCheckedToast);
                  Toast.show({
                    render: () => {
                      return (
                        <>
                          <Box
                            width={"370"}
                            bg="coolGray.800"
                            px="2"
                            py="1"
                            rounded="md"
                            mb={12}
                          >
                            <HStack
                              alignItems={"center"}
                              justifyContent="space-between"
                            >
                              <Text color={"#fff"}>
                                Price Alert{" "}
                                {isCheckedToast ? "Disabled" : "Enabled"}
                              </Text>
                              <Button
                                bg="coolGray.800"
                                onPress={() => Toast.closeAll()}
                              >
                                <Text color="#fff">DISMISS</Text>
                              </Button>
                            </HStack>
                          </Box>
                        </>
                      );
                    },
                  });
                }}
              />
            </HStack>
          </Box>

          <Box mx={3}>
            <HStack mt={3} mb={1} justifyContent="space-between">
              <Text letterSpacing={0.5} fontSize="xl" fontWeight={400}>
                Your Currencies
              </Text>
              <HStack alignItems={"center"} space={2}>
                <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                  <MaterialCommunityIcons
                    name="menu"
                    size={26}
                    color={isExpanded ? COLORS.gray : COLORS.primary}
                  />
                </Pressable>
                <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                  <MaterialCommunityIcons
                    name="view-agenda"
                    size={20}
                    color={isExpanded ? COLORS.primary : COLORS.gray}
                  />
                </Pressable>
              </HStack>
            </HStack>
          </Box>
          <Box mt={2} mx={4}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {your_currencies.map((boughtCurrencies, i) => {
                return (
                  <MyCurrencies
                    key={i}
                    isExpanded={isExpanded}
                    your_currencies={boughtCurrencies}
                  />
                );
              })}
            </ScrollView>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Portfolio;
