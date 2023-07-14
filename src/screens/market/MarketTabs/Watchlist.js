import React from "react";
import { Box, Pressable, ScrollView, Text } from "native-base";
import { useSelector } from "react-redux";
import CryptoCard from "../../../components/common/CryptoCard";

const Watchlist = ({ navigation }) => {
  const watchlist = useSelector((state) => state.FetchWatchlist.watchlist);
  return (
    <Box flex={1} flexDirection="column">
      {watchlist.length === 0 ? (
        <Box
          height={"100%"}
          alignContent={"center"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Text bold fontSize={"lg"} color="gray.400">
            Empty Watchlist !!!
          </Text>
        </Box>
      ) : (
        <ScrollView
          marginX={4}
          marginTop={5}
          showsVerticalScrollIndicator={false}
        >
          {watchlist.map((coin) => {
            return (
              <Pressable
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
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </Box>
  );
};

export default Watchlist;
