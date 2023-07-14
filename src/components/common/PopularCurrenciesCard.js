import React from "react";
import { Box, HStack, Image, Text } from "native-base";
import { FONTS } from "../../utils/Theme/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PopularCurrenciesCard = (props) => {
  return (
    <Box
      width={130}
      height={160}
      bg="#fff"
      shadow={0.5}
      rounded="xl"
      marginRight={2}
      alignContent="center"
      alignItems="center"
      mb={2}
    >
      <Box paddingTop={4} paddingBottom={1}>
        <Image
          source={{
            uri: props.image,
          }}
          height={10}
          width={10}
          alt="selected coin icon"
        />
      </Box>

      <Text
        {...FONTS.body2}
        fontSize={19}
        letterSpacing={1}
        bold
        textTransform="uppercase"
      >
        {props.symbol}
      </Text>
      <Text paddingTop={2} {...FONTS.body3} fontSize={16} letterSpacing={1}>
        ₹{parseFloat(props.current_price.toFixed(2)).toLocaleString()}
      </Text>

      <HStack py={1}>
        <Box py={0.5}>
          <MaterialCommunityIcons
            name={
              props.price_change_percentage_24h > 0 ? "menu-up" : "menu-down"
            }
            color={props.price_change_percentage_24h > 0 ? "green" : "red"}
            size={20}
          />
        </Box>
        <Text
          color={
            props.price_change_percentage_24h > 0 ? "green.600" : "red.500"
          }
          fontSize="lg"
          {...FONTS.body3}
        >
          {Math.abs(parseFloat(props.price_change_percentage_24h).toFixed(2))}%
        </Text>
      </HStack>
    </Box>
  );
};

export default PopularCurrenciesCard;
