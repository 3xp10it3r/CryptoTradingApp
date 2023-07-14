import { Box, Button, HStack, Input, Text } from "native-base";
import React, { useState } from "react";
import { FONTS } from "../../utils/Theme/Theme";

import { useDispatch, useSelector } from "react-redux";
import { setErrorModal, setSuccessModal } from "../../redux/actions";
import { ACTION_TYPE } from "../../components/constants/Constants";
import { SafeAreaView } from "react-native-safe-area-context";
import SuccessModal from "../../components/common/SuccessModal";
import ErrorModal from "../../components/common/ErrorModal";

const SellCrypto = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [percentangeValue, setPercentageValue] = useState("");

  const { buyedCoinValue, details } = route.params;

  let prevCurrencies = useSelector(
    (state) => state.FetchUserDetails.your_currencies
  );

  const uid = useSelector((state) => state.FetchUserDetails.user.user.uid);

  const fetchedBalance = useSelector((state) => state.FetchUserDetails.balance);

  const placeholderValue = `0 ${details.symbol.toUpperCase()}`;
  const handleChange = (text) => {
    setPercentageValue(text);
    setValue(text);
  };

  let selectedCurrency = prevCurrencies.filter(
    (currency) => details.coin_id == currency.coin_id
  );

  const sellCryptoCurrency = () => {
    if (value < parseFloat(0.00002)) {
      dispatch(
        setErrorModal({
          message: "Please enter the value in RANGE!",
          modalState: true,
        })
      );
    } else if (selectedCurrency.length === 0) {
      dispatch(
        setErrorModal({
          message: "you haven't bought this crypto!",
          modalState: true,
        })
      );
    } else if (value > parseFloat(buyedCoinValue)) {
      dispatch(
        setErrorModal({
          message: `You don't have sufficient ${details.symbol.toUpperCase()} balance!`,
          modalState: true,
        })
      );
    } else {
      let newCoinValue =
        parseFloat(selectedCurrency[0].buyedCoinValue) - parseFloat(value);
      let newCoinAmount =
        parseFloat(selectedCurrency[0].buyedCoinAmount) -
        parseFloat(value) * parseFloat(details.current_price);

      const idx = prevCurrencies.findIndex(
        (currency) => selectedCurrency[0].coin_id === currency.coin_id
      );

      let your_currencies = [];
      if (newCoinValue == 0) {
        const val = prevCurrencies[idx];
        your_currencies = prevCurrencies.filter(function (curr) {
          return curr != val;
        });
      } else {
        prevCurrencies[idx].buyedCoinValue = newCoinValue;
        prevCurrencies[idx].buyedCoinAmount = newCoinAmount;
        your_currencies = prevCurrencies;
      }

      dispatch({
        type: ACTION_TYPE.GET_USER_CURRENCIES,
        payload: { your_currencies, uid },
      });

      let newBalance = parseFloat(value) * parseFloat(details.current_price);

      let toAddBalance =
        Number(newBalance) +
        (Number(newBalance) * parseFloat(details.price_change_percentage_24h)) /
          100;

      const balance = Number(fetchedBalance) + Number(toAddBalance);

      dispatch({
        type: ACTION_TYPE.GET_USER_BALANCE,
        payload: { balance, uid },
      });

      setValue(0);

      dispatch(
        setSuccessModal({
          message: `Added ${toAddBalance} to INR Balance!`,
          modalState: true,
        })
      );
    }
  };
  function Dec4(num) {
    num = String(num);
    if (num.indexOf(".") !== -1) {
      var numarr = num.split(".");
      if (numarr.length == 1) {
        return Number(num);
      } else {
        return Number(
          numarr[0] + "." + numarr[1].charAt(0) + numarr[1].charAt(1)
        );
      }
    } else {
      return Number(num);
    }
  }

  const SetPercentageValue = (percent) => {
    setPercentageValue(
      (Dec4(parseFloat(buyedCoinValue) * parseFloat(percent)) / 100).toString()
    );
    setValue(Dec4(parseFloat(buyedCoinValue) * parseFloat(percent)) / 100);
  };

  return (
    <SafeAreaView>
      <ErrorModal />
      <SuccessModal goBack={() => navigation.goBack()} />
      <Box
        // mt={2}
        height={"100%"}
        justifyContent={"space-between"}
        mb={2}
      >
        <Box alignItems={"center"}>
          <Text mt={12} {...FONTS.body3}>
            <Text textTransform={"uppercase"}>{details.symbol}</Text> Amount
          </Text>
          <Input
            borderWidth={0}
            placeholder={placeholderValue}
            fontSize={30}
            {...FONTS.h1}
            fontWeight="bold"
            keyboardType="numeric"
            onChangeText={handleChange}
            value={percentangeValue}
            autoFocus
          ></Input>
          <HStack space={2} mt={2}>
            <Text {...FONTS.body3}>Balance</Text>
            <Text {...FONTS.body3} bold>
              {parseFloat(buyedCoinValue).toFixed(6)}{" "}
              {details.symbol.toUpperCase()}
            </Text>
          </HStack>
          <HStack space={2} mt={5}>
            <Button
              variant={"outline"}
              colorScheme="gray"
              onPress={() => SetPercentageValue(25)}
            >
              25%
            </Button>
            <Button
              variant={"outline"}
              colorScheme="gray"
              onPress={() => SetPercentageValue(50)}
            >
              50%
            </Button>
            <Button
              variant={"outline"}
              colorScheme="gray"
              onPress={() => SetPercentageValue(100)}
            >
              100%
            </Button>
          </HStack>
          <Text mt={4}>
            Min 0.0002 {details.symbol.toUpperCase()} | Max 105{" "}
            {details.symbol.toUpperCase()}
          </Text>
        </Box>
        <Box>
          <Button onPress={sellCryptoCurrency}>
            <Text color={"white"} {...FONTS.body2}>
              SELL
            </Text>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default SellCrypto;
