import React, { useState } from "react";
import { Box, Button, HStack, Input, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "../../utils/Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal, setSuccessModal } from "../../redux/actions";
import { ACTION_TYPE } from "../../components/constants/Constants";
import SuccessModal from "../../components/common/SuccessModal";
import ErrorModal from "../../components/common/ErrorModal";

const BuyCrypto = ({ navigation, route }) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [percentangeBalance, setPercentageValue] = useState("");

  const fetchedBalance = useSelector((state) => state.FetchUserDetails.balance);
  const uid = useSelector((state) => state.FetchUserDetails.user.user.uid);

  const prevCurrencies = useSelector(
    (state) => state.FetchUserDetails.your_currencies
  );

  const handleChange = (text) => {
    setPercentageValue(text);
    setValue(text);
  };

  const { current_price, details } = route.params;

  const buyCrypto = () => {
    if (Number(value) < 100 || Number(value) > 250000) {
      dispatch(
        setErrorModal({
          message: "Enter Amount in RANGE!",
          modalState: true,
        })
      );
    } else if (Number(fetchedBalance) < Number(value)) {
      dispatch(
        setErrorModal({
          message: "You don't have sufficient balance!",
          modalState: true,
        })
      );
    } else {
      const coin_value = Number(value) / Number(current_price);
      const balance = Number(fetchedBalance) - Number(value);
      dispatch({
        type: ACTION_TYPE.GET_USER_BALANCE,
        payload: { balance, uid },
      });

      const idx = prevCurrencies.findIndex(
        (currency) => currency.symbol === details.symbol
      );
      if (idx === -1) {
        let your_currencies = [
          ...prevCurrencies,
          { ...details, buyedCoinValue: coin_value, buyedCoinAmount: value },
        ];
        setValue("");
        dispatch({
          type: ACTION_TYPE.GET_USER_CURRENCIES,
          payload: { your_currencies, uid },
        });
      } else {
        let your_currencies = prevCurrencies;
        your_currencies[idx].buyedCoinValue =
          Number(your_currencies[idx].buyedCoinValue) + Number(coin_value);
        your_currencies[idx].buyedCoinAmount =
          Number(your_currencies[idx].buyedCoinAmount) + Number(value);
        setValue("");
        dispatch({
          type: ACTION_TYPE.GET_USER_CURRENCIES,
          payload: { your_currencies, uid },
        });
      }
      dispatch(
        setSuccessModal({
          message: `Successfully bought the ${details.symbol.toUpperCase()} `,
          modalState: true,
        })
      );
    }
  };

  const percentangeBalanceInput = (percentage) => {
    let percentBalance = (Number(fetchedBalance) * percentage) / 100;
    setPercentageValue(percentBalance.toFixed(2).toString());
    setValue(Number(percentBalance));
  };

  return (
    <SafeAreaView>
      <ErrorModal />
      <SuccessModal goBack={() => navigation.goBack()} />
      <Box height={"100%"} justifyContent={"space-between"}>
        <Box alignItems={"center"}>
          <Text mt={12} {...FONTS.body3} ml={2}>
            INR Amount
          </Text>
          <Input
            borderWidth={0}
            placeholder="₹0"
            fontSize={30}
            {...FONTS.h1}
            fontWeight="bold"
            keyboardType="numeric"
            onChangeText={handleChange}
            value={percentangeBalance}
            autoFocus
          ></Input>
          <HStack space={2} mt={2}>
            <Text {...FONTS.body3}>Balance</Text>
            <Text {...FONTS.body3} bold>
              ₹{fetchedBalance.toLocaleString()}
            </Text>
          </HStack>
          <HStack space={2} mt={5}>
            <Button
              variant={"outline"}
              colorScheme="gray"
              onPress={() => percentangeBalanceInput(25)}
            >
              25%
            </Button>
            <Button
              variant={"outline"}
              colorScheme="gray"
              onPress={() => percentangeBalanceInput(50)}
            >
              50%
            </Button>
            <Button
              variant={"outline"}
              colorScheme="gray"
              onPress={() => percentangeBalanceInput(100)}
            >
              100%
            </Button>
          </HStack>
          <Text mt={4}>Min ₹100 | Max ₹2,50,000</Text>
        </Box>
        <Box>
          <Button onPress={buyCrypto}>
            <Text color={"white"} {...FONTS.body2}>
              Buy
            </Text>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default BuyCrypto;
