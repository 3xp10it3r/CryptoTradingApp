import React from "react";
import { Box, HStack, Text, VStack, Image } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CryptoCard = ({
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_24h,
}) => {
  return (
    <Box
      rounded="lg"
      height={20}
      bg="#fff"
      width="100%"
      marginBottom={2}
      pr={1}
      flex={1}
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Box px={3} py={5} paddingRight={3}>
            <Image
              source={{
                uri: image,
              }}
              height={10}
              width={10}
              alt="coinImage"
            />
          </Box>
          <VStack>
            <Box py={3}>
              <Text fontWeight={500} fontSize="xl" letterSpacing={1}>
                {name}
              </Text>
              <Text
                color={"coolGray.500"}
                textTransform="uppercase"
                fontSize="md"
              >
                {symbol}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <Box px={2}>
          <VStack py={4} alignItems="flex-end">
            <Text fontSize="md" fontWeight={400} letterSpacing={1}>
              ₹{parseFloat(current_price).toLocaleString()}
            </Text>
            <HStack>
              <Box py={1}>
                <MaterialCommunityIcons
                  name={
                    Number(price_change_percentage_24h) < 0
                      ? "menu-down"
                      : "menu-up"
                  }
                  color={
                    Number(price_change_percentage_24h) < 0 ? "red" : "green"
                  }
                  size={20}
                />
              </Box>
              <Text
                color={
                  Number(price_change_percentage_24h) < 0
                    ? "red.600"
                    : "green.600"
                }
                fontSize="lg"
                fontWeight={400}
                alignSelf="flex-end"
              >
                {Math.abs(parseFloat(price_change_percentage_24h).toFixed(2))}%
              </Text>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default CryptoCard;
