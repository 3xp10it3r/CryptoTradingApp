import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Box, HStack, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTS } from "../utils/Theme/Theme";
import { CryptoDetails } from "../screens/cryptoDetails";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../components/constants/Constants";

const Stack = createNativeStackNavigator();

const CryptoDetailsStack = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [star, setStar] = useState(false);
  const watchlist = useSelector((state) => state.FetchWatchlist.watchlist);
  const uid = useSelector((state) => state.FetchUserDetails.user.user.uid);
  console.log("passs : ", uid);

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

  const filterWatchlist = () => {
    const found = watchlist.filter((coin) => {
      return coin.symbol === symbol;
    });
    if (found.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  var found;
  useEffect(() => {
    found = filterWatchlist();
    setStar(found);
  }, []);

  const modifyWatchlist = () => {
    if (star) {
      const watchListCoins = watchlist.filter((coin) => {
        return coin.symbol !== symbol;
      });
      dispatch({
        type: ACTION_TYPE.GET_WATCHLIST_COINS,
        payload: { watchListCoins, uid },
      });
      setStar(false);
    } else {
      const watchListCoins = [...watchlist, route.params];
      dispatch({
        type: ACTION_TYPE.GET_WATCHLIST_COINS,
        payload: { watchListCoins, uid },
      });
      setStar(true);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "",
          headerTitle: "",
          headerLeft: ({ focused }) => (
            <Box>
              <HStack>
                <Pressable onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons
                    name="arrow-left"
                    color={focused ? "gray" : "black"}
                    size={30}
                  />
                </Pressable>
                <HStack justifyContent={"space-between"}>
                  <Text
                    ml={5}
                    paddingBottom={1}
                    {...FONTS.h2}
                    bold
                    color={"coolGray.700"}
                    textTransform="uppercase"
                  >
                    {symbol}
                  </Text>
                </HStack>
              </HStack>
            </Box>
          ),
          headerRight: () => (
            <Pressable onPress={() => setStar(!star) + modifyWatchlist()}>
              <Box
                rounded={"full"}
                borderWidth={2}
                marginBottom={2}
                borderColor={star ? "orange.100" : "lightgray"}
                p={1}
              >
                {star ? (
                  <MaterialCommunityIcons
                    name="star"
                    size={26}
                    color="orange"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="star-outline"
                    size={26}
                    color="gray"
                  />
                )}
              </Box>
            </Pressable>
          ),
        }}
        name="CryptoDetails"
        component={CryptoDetails}
        initialParams={{
          symbol: symbol,
          coin_id: coin_id,
          name: name,
          current_price: current_price,
          image: image,
          price_change_percentage_24h: price_change_percentage_24h,
          low_24h: low_24h,
          high_24h: high_24h,
          market_cap: market_cap,
          market_cap_rank: market_cap_rank,
          total_volume: total_volume,
          circulating_supply: circulating_supply,
        }}
      />
    </Stack.Navigator>
  );
};

export default CryptoDetailsStack;
