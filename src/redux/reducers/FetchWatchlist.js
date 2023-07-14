import { ACTION_TYPE } from "../../components/constants/Constants";

const initialState = {
  watchlist: [],
};

const FetchWatchlist = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_WATCHLIST_COINS:
      return {
        ...state,
        watchlist: action.payload,
      };
    default:
      return state;
  }
};

export default FetchWatchlist;
