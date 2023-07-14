import React, { useState } from "react";
import { Box, Button, HStack, Input, Text } from "native-base";
import { COLORS, FONTS } from "../../utils/Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../../components/constants/Constants";
import { setSuccessModal } from "../../redux/actions";
import SuccessModal from "../../components/common/SuccessModal";

const DepositINR = ({ navigation }) => {
  const dispatch = useDispatch();
  const [money, setMoney] = useState("");
  const [inValid, setInValid] = useState(false);

  const uid = useSelector((state) => state.FetchUserDetails.user.user.uid);
  const fetchedBalance = useSelector((state) => state.FetchUserDetails.balance);

  const depositMoney = () => {
    if (money == "" || parseInt(money) < 100 || parseInt(money) > 5000000) {
      setInValid(true);
    } else {
      let balance = Number(money) + Number(fetchedBalance);
      dispatch({
        type: ACTION_TYPE.GET_USER_BALANCE,
        payload: { balance, uid },
      });

      dispatch(
        setSuccessModal({
          message: `Added ${money} to INR Balance!`,
          modalState: true,
        })
      );
      setMoney("");
    }
  };

  const buttonMoneyAdd = (rupee) => {
    if (money !== "") {
      setMoney(String(parseInt(money) + rupee));
    } else {
      setMoney(String(rupee));
    }
  };

  return (
    <Box height={"100%"} bg="coolGray.200">
      <SuccessModal goBack={() => navigation.goBack()} />
      <Box
        height={"80%"}
        alignContent={"center"}
        alignItems="center"
        justifyContent={"center"}
      >
        <Text {...FONTS.h1} bold fontSize="4xl" letterSpacing={1}>
          ₹{fetchedBalance.toFixed(2)}
        </Text>
        <Text {...FONTS.body3} mt={2} letterSpacing={1}>
          CURRENT BALANCE
        </Text>
        <Input
          mt={12}
          rounded="md"
          variant="outline"
          placeholder="Enter Amount"
          placeholderTextColor={"coolGray.500"}
          width={"90%"}
          fontSize="xl"
          isInvalid={inValid}
          borderColor={"coolGray.500"}
          _focus={{ borderColor: "#3f00ff" }}
          keyboardType="numeric"
          returnKeyType="done"
          value={String(money)}
          onChangeText={(money) => setMoney(money)}
        />
        <HStack mt={10} space={1}>
          <Button
            rounded="3xl"
            colorScheme="gray"
            bg={"coolGray.300"}
            onPress={() => buttonMoneyAdd(100)}
          >
            <Text {...FONTS.body3} letterSpacing={1}>
              + ₹100
            </Text>
          </Button>
          <Button
            rounded="3xl"
            colorScheme="gray"
            bg={"coolGray.300"}
            onPress={() => buttonMoneyAdd(500)}
          >
            <Text {...FONTS.body3} letterSpacing={1}>
              + ₹500
            </Text>
          </Button>
          <Button
            rounded="3xl"
            colorScheme="gray"
            bg={"coolGray.300"}
            onPress={() => buttonMoneyAdd(1000)}
          >
            <Text {...FONTS.body3} letterSpacing={1}>
              + ₹1,000
            </Text>
          </Button>
          <Button
            rounded="3xl"
            colorScheme="gray"
            bg={"coolGray.300"}
            onPress={() => buttonMoneyAdd(2500)}
          >
            <Text {...FONTS.body3} letterSpacing={1}>
              + ₹2,500
            </Text>
          </Button>
        </HStack>

        <Text mt={4} {...FONTS.body3}>
          Min ₹100 , Max ₹50,00,000
        </Text>

        <Button
          rounded="lg"
          mt={12}
          colorScheme="blue"
          width="90%"
          bg={"#3f00ff"}
          onPress={() => depositMoney()}
        >
          <Text {...FONTS.body3} color={COLORS.white} letterSpacing={1}>
            DEPOSIT
          </Text>
        </Button>

        <Text mt={1} {...FONTS.body4} color="coolGray.500">
          Processing time upto 15 minutes
        </Text>
      </Box>
    </Box>
  );
};

export default DepositINR;
