import React from "react";
import { Box, HStack, Text, VStack, Image, Divider } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyCurrencies = (props) => {
  const totalProfit =
    (parseFloat(props.your_currencies.buyedCoinAmount) *
      parseFloat(props.your_currencies.price_change_percentage_24h)) /
    100;
  console.log("totalProfit : ", totalProfit);

  return (
    <Box>
      <Box
        rounded="lg"
        height={props.isExpanded ? 40 : 20}
        bg="#fff"
        width="100%"
        marginBottom={2}
        flex={1}
      >
        <HStack justifyContent="space-between">
          <HStack>
            <Box px={3} paddingTop={5} paddingRight={3}>
              <Image
                source={{ uri: props.your_currencies.image }}
                height={10}
                width={10}
                alt="icon"
              />
            </Box>
            <VStack>
              <Box py={3}>
                <Text fontWeight={400} fontSize="xl" letterSpacing={0.5}>
                  {props.your_currencies.name}
                </Text>
                <Text
                  color={"coolGray.400"}
                  textTransform="uppercase"
                  fontSize="lg"
                >
                  {parseFloat(props.your_currencies.buyedCoinValue).toFixed(6)}{" "}
                  <Text textTransform={"uppercase"}>
                    {props.your_currencies.symbol}
                  </Text>
                </Text>
              </Box>
            </VStack>
          </HStack>
          <VStack py={2} px={3} justifyContent="center" alignItems="flex-end">
            <Text ml={5} fontSize="md" letterSpacing={0.5}>
              ₹
              {Number(
                parseFloat(
                  parseFloat(props.your_currencies.buyedCoinAmount) +
                    parseFloat(totalProfit)
                ).toFixed(2)
              ).toLocaleString()}
            </Text>
            <HStack>
              <Box py={1}>
                <MaterialCommunityIcons
                  name={
                    Number(props.your_currencies.price_change_percentage_24h) <
                    0
                      ? "menu-down"
                      : "menu-up"
                  }
                  color={
                    Number(props.your_currencies.price_change_percentage_24h) <
                    0
                      ? "red"
                      : "green"
                  }
                  size={20}
                />
              </Box>
              <Text
                color={
                  Number(props.your_currencies.price_change_percentage_24h) < 0
                    ? "red.500"
                    : "green.600"
                }
                fontSize="lg"
                fontWeight={400}
                alignSelf="flex-end"
              >
                {Math.abs(
                  parseFloat(
                    props.your_currencies.price_change_percentage_24h
                  ).toFixed(2)
                )}
                %
              </Text>
            </HStack>
          </VStack>
        </HStack>
        {props.isExpanded ? (
          <Box marginLeft={16} mr={3}>
            <Divider />
            <HStack justifyContent={"space-between"} alignItems="center">
              <Text my={2} fontSize="sm" color="coolGray.600" fontWeight={300}>
                Invested Value
              </Text>
              <Text ml={5} fontSize="sm" color="#000" fontWeight={300}>
                ₹
                {Number(
                  Number(props.your_currencies.buyedCoinAmount).toFixed(2)
                ).toLocaleString()}
              </Text>
            </HStack>
            <Divider />
            <HStack justifyContent={"space-between"} alignItems="center">
              <Text my={2} fontSize="sm" fontWeight={300} color="coolGray.600">
                Total {totalProfit < 0 ? "Loss" : "Profit"}
              </Text>
              <Text ml={5} fontSize="sm" color="#000" fontWeight={300}>
                ₹{Math.abs(totalProfit.toFixed(2))}
              </Text>
            </HStack>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default MyCurrencies;
