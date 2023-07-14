import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { FONTS } from "../../utils/Theme/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { VictoryLine } from "victory-native";
import { useSelector } from "react-redux";

const CryptoDetails = ({ route, navigation }) => {
  const {
    coin_id,
    symbol,
    name,
    current_price,
    image,
    price_change_percentage_24h,
    low_24h,
    high_24h,
    market_cap,
    circulating_supply,
    market_cap_rank,
    total_volume,
  } = route.params;
  const [data, setData] = useState();
  // const [coin, setCoin] = useState(coin_id);
  const [period, setPeriod] = useState(30);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    getData();
  }, [period, name]);

  async function getData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=inr&days=${period}`
      );
      const formatData = response.data.prices.map(function (i) {
        return {
          x: i[0],
          y: i[1],
        };
      });
      setData(formatData);
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
    }
  }

  const your_currencies = useSelector(
    (state) => state.FetchUserDetails.your_currencies
  );

  const bought = your_currencies.filter(
    (currency) => currency.coin_id === coin_id
  );

  let buyedCoinAmount = 0;
  let buyedCoinValue = 0;
  if (bought.length !== 0) {
    buyedCoinAmount = bought[0].buyedCoinAmount;
    buyedCoinValue = bought[0].buyedCoinValue;
  }

  return (
    <Box width={"100%"} height="100%" shadow={0.9}>
      <ScrollView>
        <Box p={5} bg={"#fff"} shadow={0.9}>
          <HStack>
            <Box
              height={50}
              width={50}
              rounded="md"
              borderWidth={1}
              borderColor="coolGray.300"
              alignItems={"center"}
              justifyContent="center"
              mr={2}
            >
              <Image
                source={{
                  uri: image,
                }}
                alt="selected Crypto"
                height={30}
                width={30}
              />
            </Box>
            <HStack justifyContent={"space-between"} width={"85%"}>
              <VStack>
                <Text {...FONTS.body3} color="coolGray.500">
                  Current Buy Price
                </Text>
                <Text {...FONTS.body2} bold>
                  ₹{Number(parseFloat(current_price)).toLocaleString()}
                </Text>
              </VStack>
              <VStack>
                <Text>Buy Price</Text>
                <HStack>
                  <Box py={1}>
                    <MaterialCommunityIcons
                      name={
                        price_change_percentage_24h > 0
                          ? "menu-up"
                          : "menu-down"
                      }
                      color={price_change_percentage_24h > 0 ? "green" : "red"}
                      size={20}
                    />
                  </Box>
                  <Text
                    color={
                      price_change_percentage_24h > 0 ? "green.600" : "red.500"
                    }
                    fontSize="lg"
                    alignSelf="flex-end"
                  >
                    {Math.abs(
                      parseFloat(price_change_percentage_24h).toFixed(2)
                    )}
                    %
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </HStack>
          <HStack mt={4} justifyContent="space-between">
            <Text {...FONTS.body4} color="coolGray.400" mr={1}>
              1D Highest
            </Text>
            <Text {...FONTS.body3}>
              ₹{parseFloat(high_24h).toLocaleString()}
            </Text>
            <Text {...FONTS.body3} color="coolGray.200" mx={1}>
              |
            </Text>
            <Text {...FONTS.body4} color="coolGray.400" mr={1}>
              1D Lowest
            </Text>
            <Text {...FONTS.body3}>
              ₹{parseFloat(low_24h).toLocaleString()}
            </Text>
          </HStack>

          {isLoaded ? (
            <View
              display={"flex"}
              width={440}
              height={200}
              ml={-10}
              alignContent="center"
              justifyContent={"center"}
            >
              <Spinner size={"lg"} color="#3f00ee" />
            </View>
          ) : (
            <View ml={-12}>
              <VictoryLine
                style={{
                  data: {
                    stroke: price_change_percentage_24h > 0 ? "green" : "red",
                    strokeWidth: 2,
                  },
                }}
                width={440}
                height={200}
                data={data}
              />
            </View>
          )}
          <HStack space={2} mt={5} alignSelf="center">
            <Button
              variant={period == 1 ? "Ghost" : "outline"}
              colorScheme="gray"
              width={20}
              borderWidth={0.5}
              onPress={() => setPeriod(1)}
            >
              <Text color="black" bold>
                1D
              </Text>
            </Button>
            <Button
              variant={period == 7 ? "Ghost" : "outline"}
              colorScheme="gray"
              width={20}
              borderWidth={0.5}
              onPress={() => setPeriod(7)}
            >
              <Text color="black" bold>
                7D
              </Text>
            </Button>
            <Button
              variant={period == 30 ? "Ghost" : "outline"}
              colorScheme="gray"
              width={20}
              borderWidth={0.5}
              onPress={() => setPeriod(30)}
            >
              <Text color="black" bold>
                1M
              </Text>
            </Button>
            <Button
              variant={period == 365 ? "Ghost" : "outline"}
              colorScheme="gray"
              width={20}
              borderWidth={0.5}
              onPress={() => setPeriod(365)}
            >
              <Text color="black" bold>
                1Y
              </Text>
            </Button>
          </HStack>
        </Box>
        <Box></Box>

        <Box p={5} width="100%">
          <Text {...FONTS.body3} fontSize="xl">
            Your Portfolio
          </Text>
          <HStack width={"100%"}>
            <VStack width={"50%"}>
              <Box rounded={"md"} bg="#fff" m={2} p={3}>
                <Text color={"coolGray.500"} {...FONTS.body3}>
                  <Text textTransform={"uppercase"}>{symbol}</Text> Balance
                </Text>
                <Text {...FONTS.body3} fontSize="lg" pt={2} bold>
                  {parseFloat(buyedCoinValue).toFixed(7)}
                </Text>
              </Box>
              <Box rounded={"md"} bg="#fff" m={2} p={3}>
                <Text color={"coolGray.500"} {...FONTS.body3}>
                  Average Buy Price
                </Text>
                <Text {...FONTS.body3} fontSize="lg" pt={2} bold>
                  ₹{current_price.toLocaleString()}
                </Text>
              </Box>
            </VStack>
            <VStack width={"50%"}>
              <Box rounded={"md"} bg="#fff" m={2} p={3}>
                <Text color={"coolGray.500"} {...FONTS.body3}>
                  Current Value
                </Text>
                <Text {...FONTS.body3} fontSize="lg" pt={2} bold>
                  ₹
                  {parseFloat(
                    parseFloat(buyedCoinAmount) +
                      (Number(buyedCoinAmount) *
                        Number(price_change_percentage_24h)) /
                        100
                  ).toFixed(2)}
                </Text>
              </Box>
              <Box rounded={"md"} bg="#fff" m={2} p={3}>
                <Text color={"coolGray.500"} {...FONTS.body3}>
                  Gain/Loss
                </Text>
                <HStack pt={1}>
                  <Box pt={1}>
                    <MaterialCommunityIcons
                      name={
                        price_change_percentage_24h > 0
                          ? "menu-up"
                          : "menu-down"
                      }
                      color={price_change_percentage_24h > 0 ? "green" : "red"}
                      size={20}
                    />
                  </Box>
                  <Text
                    color={
                      price_change_percentage_24h > 0 ? "green.600" : "red.500"
                    }
                    fontSize="lg"
                    alignSelf="flex-end"
                  >
                    {Math.abs(
                      parseFloat(price_change_percentage_24h).toFixed(2)
                    )}
                    %
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
        <Box p={5} bg={"white"}>
          <Text {...FONTS.body3} fontSize="xl">
            About<Text textTransform={"uppercase"}> {symbol}</Text>
          </Text>
          <HStack justifyContent={"space-between"} py={5}>
            <Text color="coolGray.500">Market Rank</Text>
            <Text>#{market_cap_rank}</Text>
          </HStack>
          <Divider />
          <HStack justifyContent={"space-between"} py={5}>
            <Text color="coolGray.500">Market Cap</Text>
            <Text>{parseFloat(market_cap).toLocaleString()} rupees</Text>
          </HStack>
          <Divider />
          <HStack justifyContent={"space-between"} py={5}>
            <Text color="coolGray.500">Circulating Supply</Text>
            <Text>
              {parseFloat(circulating_supply).toLocaleString()}{" "}
              <Text textTransform={"uppercase"}>{symbol}</Text>
            </Text>
          </HStack>
          <Divider />
          <HStack justifyContent={"space-between"} py={5}>
            <Text color="coolGray.500">Total Volume</Text>
            <Text>{parseFloat(total_volume).toLocaleString()}</Text>
          </HStack>
          <Divider />
        </Box>
      </ScrollView>
      <Box width={"100%"}>
        <HStack>
          <Button
            width={"50%"}
            size={12}
            onPress={() =>
              navigation.navigate("BuyStack", {
                symbol: symbol,
                current_price: current_price,
                details: route.params,
              })
            }
          >
            <Text {...FONTS.h3} bold color={"white"}>
              BUY
            </Text>
          </Button>
          <Divider orientation="vertical" />
          <Button
            width={"50%"}
            onPress={() =>
              navigation.navigate("SellStack", {
                details: route.params,
                buyedCoinValue: buyedCoinValue,
              })
            }
          >
            <Text {...FONTS.h3} bold color={"white"}>
              SELL
            </Text>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
export default CryptoDetails;
