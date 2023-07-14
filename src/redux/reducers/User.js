import { ACTION_TYPE } from "../../components/constants/Constants";

const initialState = {
  user: undefined,
  balance: 0,
  your_currencies: [],
  userImage: "",
};

const FetchUserDetails = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER_DETAILS:
      return { ...state, user: action.payload };
    case ACTION_TYPE.SET_USER_BALANCE:
      return { ...state, balance: action.payload };
    case ACTION_TYPE.SET_USER_CURRENCIES:
      return { ...state, your_currencies: action.payload };
    case ACTION_TYPE.SET_USER_IMAGE:
      return { ...state, userImage: action.payload };
    default:
      return state;
  }
};

export default FetchUserDetails;
