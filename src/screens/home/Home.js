import React, { useEffect, useState } from "react";
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
import { SafeAreaView, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/Theme/Theme";
import { icons } from "../../utils/icons";
import { FONTS } from "../../utils/Theme/Theme";
import PopularCurrenciesCard from "../../components/common/PopularCurrenciesCard";
import WorthModal from "./WorthModal";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoData } from "../../redux/actions";
import createDocument from "../../firebaseFirestore/FirebaseFunctions";
import CryptoCard from "../../components/common/CryptoCard";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);

  const user = useSelector((state) => state.FetchUserDetails.user);
  const watchlist = useSelector((state) => state.FetchWatchlist.watchlist);

  useEffect(() => {
    dispatch(getCryptoData());
    setIsLoaded(false);
  }, []);

  useEffect(() => {
    try {
      createDocument(user.user.uid, dispatch);
    } catch {
      console.log("error firestore");
    }
  }, []);

  const coins = useSelector((state) => state.fetchCryptoCurrencies.coins);
  const fetchedBalance = useSelector((state) => state.FetchUserDetails.balance);

  const your_currencies = useSelector(
    (state) => state.FetchUserDetails.your_currencies
  );

  const CurrentValue = your_currencies.reduce(function (sum, current) {
    return (
      sum +
      Number(current.buyedCoinAmount) +
      (current.buyedCoinAmount * current.price_change_percentage_24h) / 100
    );
  }, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView bg={"coolGray.100"}>
        <Box
          width={"100%"}
          height={140}
          bg="#fff"
          shadow={0.5}
          rounded="md"
          paddingLeft={4}
          paddingRight={4}
        >
          <Text fontSize={"sm"} color="coolGray.600" pt={2} letterSpacing={0.5}>
            Total Worth
          </Text>
          <HStack>
            <Text fontWeight={500} fontSize={26}>
              <Text fontWeight={600}>₹</Text>
              {parseFloat(
                parseFloat(
                  Number(fetchedBalance) + Number(CurrentValue)
                ).toFixed(2)
              ).toLocaleString()}
            </Text>
            <Box ml={2}>
              <WorthModal INR={fetchedBalance} CurrentValue={CurrentValue} />
            </Box>
          </HStack>
          <HStack marginTop={4} space={0.3}>
            <Button
              width="49%"
              bg={COLORS.primary}
              height="10"
              alignItems="center"
              justifyContent="center"
              rounded="sm"
              onPress={() =>
                navigation.navigate("BuyStack", {
                  symbol: coins[0].symbol,
                  current_price: coins[0].current_price,
                  details: coins[0],
                })
              }
              colorScheme="rgba(2, 82, 242,0.4)"
            >
              <HStack alignItems={"center"} justifyContent="center">
                <Box py={2} paddingRight={3}>
                  <Image
                    source={{
                      uri: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
                    }}
                    height={5}
                    width={5}
                    alt="bitcoin"
                    alignSelf={"center"}
                  />
                </Box>
                <Text color="white" fontSize="lg" letterSpacing={1}>
                  BUY BITCOIN
                </Text>
              </HStack>
            </Button>
            <Text> </Text>
            <Button
              width="49%"
              bg="#fff"
              borderColor={COLORS.primary}
              borderWidth={1}
              height={10}
              alignItems="center"
              justifyContent="center"
              rounded="sm"
              onPress={() => navigation.navigate("DepositStack")}
              colorScheme="rgba(2, 82, 242,0.3)"
            >
              <Box>
                <Text
                  {...FONTS.body3}
                  textTransform="uppercase"
                  letterSpacing={1}
                  color={COLORS.primary}
                  fontSize="lg"
                >
                  Deposit INR
                </Text>
              </Box>
            </Button>
          </HStack>
        </Box>

        <Box marginLeft={4} marginRight={4} marginTop={4} mb={1}>
          <HStack justifyContent={"space-between"}>
            <Text
              fontSize="xl"
              paddingBottom={1}
              letterSpacing={0.6}
              fontWeight={300}
            >
              Watchlist
            </Text>
            {watchlist.length !== 0 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MarketStack", {
                    screen: "MARKET",
                    params: { screen: "All" },
                  })
                }
              >
                <Text
                  fontSize={"md"}
                  fontWeight={500}
                  marginTop={1}
                  color="#3f00ff"
                  letterSpacing={1}
                >
                  Add More
                </Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </HStack>
          {watchlist.length === 0 ? (
            <Box
              width={"100%"}
              height={125}
              bg="#fff"
              shadow={0.3}
              rounded="md"
              py={3}
              paddingLeft={4}
              paddingRight={4}
            >
              <HStack>
                <Box px={1} pb={2} paddingRight={2}>
                  <Image
                    source={icons.bigSearch}
                    height={12}
                    width={12}
                    alt="search"
                  />
                </Box>
                <VStack>
                  <Text fontSize={"md"} color="coolGray.500">
                    Track your favorite coins by
                  </Text>
                  <Text fontSize={"md"} color="coolGray.500">
                    adding them to your watchlist.
                  </Text>
                </VStack>
              </HStack>
              <Button
                margin={1}
                size="lg"
                variant="outline"
                borderColor={COLORS.primary}
                colorScheme="gray"
                onPress={() =>
                  navigation.navigate("MarketStack", {
                    screen: "MARKET",
                    params: { screen: "All" },
                  })
                }
              >
                <Text {...FONTS.body3} color={COLORS.primary}>
                  Explore Currencies
                </Text>
              </Button>
            </Box>
          ) : (
            <Box flex={1} flexDirection="column">
              <ScrollView marginTop={2} showsVerticalScrollIndicator={false}>
                {watchlist.map((coin) => {
                  return (
                    <TouchableOpacity
                      key={coin.name}
                      onPress={() =>
                        navigation.navigate("CryptoDetailsStack", {
                          coin_id: coin.coin_id,
                          symbol: coin.symbol,
                          name: coin.name,
                          current_price: coin.current_price,
                          image: coin.image,
                          price_change_percentage_24h:
                            coin.price_change_percentage_24h,
                          low_24h: coin.low_24h,
                          high_24h: coin.high_24h,
                          market_cap: coin.market_cap,
                          circulating_supply: coin.circulating_supply,
                          market_cap_rank: coin.market_cap_rank,
                          total_volume: coin.total_volume,
                        })
                      }
                    >
                      <CryptoCard
                        key={coin.id}
                        symbol={coin.symbol}
                        name={coin.name}
                        current_price={coin.current_price}
                        image={coin.image}
                        price_change_percentage_24h={
                          coin.price_change_percentage_24h
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Box>
          )}
        </Box>

        <Box marginLeft={4} marginRight={4} marginTop={2}>
          <Text
            letterSpacing={0.6}
            fontWeight={300}
            fontSize="xl"
            paddingBottom={3}
          >
            Categories
          </Text>
          <Box
            width={"100%"}
            height={112}
            bg="#fff"
            shadow={0.3}
            rounded="md"
            py={0}
            paddingLeft={4}
            paddingRight={4}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MarketStack", {
                  screen: "MARKET",
                  params: { screen: "Defi" },
                })
              }
            >
              <Box>
                <HStack justifyContent={"space-between"} alignItems="center">
                  <Text fontSize={"xl"} color="black">
                    DeFi
                  </Text>
                  <Box py={2}>
                    <Image
                      source={icons.defi_icon}
                      height={10}
                      width={32}
                      marginRight={-6}
                      alt="defi"
                    />
                  </Box>
                </HStack>
              </Box>
            </TouchableOpacity>

            <Divider w="100%" />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MarketStack", {
                  screen: "MARKET",
                  params: { screen: "Metaverse" },
                })
              }
            >
              <Box>
                <HStack justifyContent={"space-between"} alignItems="center">
                  <Text fontSize={"xl"} color="black">
                    Metaverse
                  </Text>
                  <Box py={2}>
                    <Image
                      source={icons.metaVerse_icon}
                      height={10}
                      width={32}
                      marginRight={-6}
                      alt="metaverse"
                    />
                  </Box>
                </HStack>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>

        <Box marginLeft={4} marginRight={4} marginTop={8}>
          <HStack justifyContent={"space-between"}>
            <Text
              fontSize="xl"
              paddingBottom={2}
              // color="blueGray.700"
              letterSpacing={0.6}
              fontWeight={300}
            >
              Popular Currencies
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MarketStack", {
                  screen: "MARKET",
                  params: { screen: "All" },
                })
              }
            >
              <Text
                fontSize={"md"}
                fontWeight={500}
                marginTop={1}
                color="#3f00ff"
                letterSpacing={1}
              >
                See More
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>

        {isLoaded ? (
          <View
            display={"flex"}
            flex="0"
            height={50}
            justifyContent={"center"}
            alignContent="center"
          >
            <Spinner size="lg" color="blue.700" />
          </View>
        ) : (
          <ScrollView horizontal mx={4} showsHorizontalScrollIndicator={false}>
            {coins.map((coin) => {
              return (
                <TouchableOpacity
                  key={coin.id}
                  onPress={() =>
                    navigation.navigate("CryptoDetailsStack", {
                      coin_id: coin.id,
                      symbol: coin.symbol,
                      name: coin.name,
                      current_price: coin.current_price,
                      image: coin.image,
                      price_change_percentage_24h:
                        coin.price_change_percentage_24h,
                      low_24h: coin.low_24h,
                      high_24h: coin.high_24h,
                      market_cap: coin.market_cap,
                      circulating_supply: coin.circulating_supply,
                      market_cap_rank: coin.market_cap_rank,
                      total_volume: coin.total_volume,
                    })
                  }
                >
                  <PopularCurrenciesCard
                    symbol={coin.symbol}
                    current_price={coin.current_price}
                    price_change_percentage_24h={
                      coin.price_change_percentage_24h
                    }
                    image={coin.image}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
