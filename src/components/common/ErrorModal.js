import React from "react";
import { Box, Button, Modal, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal } from "../../redux/actions";

const ErrorModal = ({ goBack }) => {
  const dispatch = useDispatch();
  const ErrorMessageAndState = useSelector(
    (state) => state.FetchErrorModal.modalError
  );

  const ShowModal = () => {
    dispatch(setErrorModal({ message: "", modalState: false }));
  };

  return (
    <Modal
      isOpen={ErrorMessageAndState.modalState}
      // onClose={() => setShowModal(false)}
    >
      <Modal.Content maxWidth="350px">
        <Modal.Header alignItems={"center"}>
          <Text bold color={"red.500"} fontSize="lg">
            Error !!!
          </Text>
        </Modal.Header>
        <Modal.Body alignContent={"center"} alignItems="center">
          <Box
            alignContent={"center"}
            alignItems="center"
            justifyContent={"center"}
            alignSelf="center"
          >
            <Text fontSize={"md"} bold mb={2}>
              {ErrorMessageAndState.message}
            </Text>
          </Box>
          <Button
            width={250}
            onPress={() => {
              ShowModal();
              goBack != undefined ? goBack() : "";
            }}
          >
            <Text bold color={"white"} fontSize="md">
              OK
            </Text>
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ErrorModal;
