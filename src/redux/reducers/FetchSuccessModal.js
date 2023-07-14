import { ACTION_TYPE } from "../../components/constants/Constants";

const initialState = {
  modalSuccess: { message: "", modalState: false },
};

const FetchSuccessModal = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_SUCCESS_MODAL:
      return { ...state, modalSuccess: action.payload };
    default:
      return state;
  }
};

export default FetchSuccessModal;
