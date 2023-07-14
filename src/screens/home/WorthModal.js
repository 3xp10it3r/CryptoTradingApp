import React, { useState } from "react";
import {
  Modal,
  Center,
  VStack,
  HStack,
  Text,
  Divider,
  Pressable,
  Box,
} from "native-base";

const WorthModal = ({ INR, CurrentValue }) => {
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <Center flex={1}>
      <Pressable onPress={() => openModal("bottom")}>
        <Box
          borderColor="coolGray.400"
          borderWidth={2}
          rounded="full"
          width={5}
          height={5}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text color="coolGray.400" bold fontSize={12}>
            ?
          </Text>
        </Box>
      </Pressable>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Content width={"100%"} maxWidth={"100%"} {...styles[placement]}>
          <Modal.CloseButton />
          <Modal.Header>Total Worth</Modal.Header>
          <Modal.Body>
            <VStack space={5}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Portfolio Current Value</Text>
                <Text fontWeight="medium" color="blueGray.400">
                  {parseFloat(CurrentValue).toFixed(2)}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">INR Balance</Text>
                <Text fontWeight="medium" color="blueGray.400">
                  {parseFloat(INR).toFixed(2)}
                </Text>
              </HStack>
              <Divider />
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Worth</Text>
                <Text fontWeight="medium" color="green.500">
                  {parseFloat(Number(INR) + Number(CurrentValue)).toFixed(2)}
                </Text>
              </HStack>
              <Divider />
              <Text color={"coolGray.400"}>
                Your current investment value is subject to market fluctuations
                and is an estimate of what your investment is worth at this
                time.
              </Text>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

const styles = {
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {},
};
export default WorthModal;
