import { ACTION_TYPE } from "../../components/constants/Constants";

const initialState = {
  coins: [],
};

const fetchCryptoCurrencies = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CRYPTO_DATA:
      return {
        ...state,
        coins: action.payload,
      };
    default:
      return state;
  }
};

export default fetchCryptoCurrencies;
