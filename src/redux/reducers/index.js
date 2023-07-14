import { combineReducers } from "redux";

import fetchCryptoCurrencies from "./FetchCryptoReducer";
import FetchWatchlist from "./FetchWatchlist";
import FetchUserDetails from "./User";
import fetchUserAuthState from "./UserAuthState";
import FetchSuccessModal from "./FetchSuccessModal";
import FetchErrorModal from "./FetchErrorModal";

const rootReducer = combineReducers({
  fetchCryptoCurrencies,
  FetchWatchlist,
  FetchUserDetails,
  fetchUserAuthState,
  FetchSuccessModal,
  FetchErrorModal,
});

export default rootReducer;
