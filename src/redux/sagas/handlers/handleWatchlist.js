import { put, takeLatest, call } from "redux-saga/effects";
import { updateWatchlistDocument } from "../../../firebaseFirestore/FirebaseFunctions";
import { ACTION_TYPE } from "../../../components/constants/Constants";
import { setWatchlistCoins } from "../../actions";

export function* handleWatchlist(action) {
  try {
    console.log("action : ", action);
    yield call(
      updateWatchlistDocument,
      action.payload.watchListCoins,
      action.payload.uid
    );
    console.log("action : ", action);
    yield put(setWatchlistCoins(action.payload.watchListCoins));
  } catch (error) {
    alert(error);
  }
}

export default function* watcherWatchlist() {
  yield takeLatest(ACTION_TYPE.GET_WATCHLIST_COINS, handleWatchlist);
}
