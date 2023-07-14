import React from "react";
import { Button, Modal, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setSuccessModal } from "../../redux/actions";

const SuccessModal = ({ goBack }) => {
  const dispatch = useDispatch();
  const SuccessMessageAndState = useSelector(
    (state) => state.FetchSuccessModal.modalSuccess
  );

  const ShowModal = () => {
    dispatch(setSuccessModal({ message: "", modalState: false }));
  };

  return (
    <Modal
      isOpen={SuccessMessageAndState.modalState}
      // onClose={() => setShowModal(false)}
    >
      <Modal.Content maxWidth="350px">
        <Modal.Header alignItems={"center"}>
          <Text bold color={"green.500"} fontSize="lg">
            Successful !!!
          </Text>
        </Modal.Header>
        <Modal.Body alignContent={"center"} alignItems="center">
          <Text fontSize={"md"} bold mb={2}>
            {SuccessMessageAndState.message}
          </Text>
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

export default SuccessModal;
