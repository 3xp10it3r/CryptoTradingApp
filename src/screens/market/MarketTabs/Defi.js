import React from "react";
import CryptoCard from "../../../components/common/CryptoCard";
import { ScrollView, Box, Pressable } from "native-base";
import { useSelector } from "react-redux";

const Defi = ({ navigation }) => {
  const coins = useSelector((state) => state.fetchCryptoCurrencies.coins);

  return (
    <Box flex={1} flexDirection="column">
      <ScrollView
        marginX={4}
        marginTop={5}
        showsVerticalScrollIndicator={false}
      >
        {coins.map((coin) => {
          return (
            <Pressable
              key={coin.id}
              onPress={() =>
                navigation.navigate("CryptoDetailsStack", {
                  coin_id: coin.id,
                  symbol: coin.symbol,
                  name: coin.name,
                  current_price: coin.current_price,
                  image: coin.image,
                  price_change_percentage_24h: coin.price_change_percentage_24h,
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
    </Box>
  );
};

export default Defi;
