import { ACTION_TYPE } from "../../components/constants/Constants";

const initialState = {
  modalError: { message: "", modalState: false },
};

const FetchErrorModal = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ERROR_MODAL:
      return { ...state, modalError: action.payload };
    default:
      return state;
  }
};

export default FetchErrorModal;
