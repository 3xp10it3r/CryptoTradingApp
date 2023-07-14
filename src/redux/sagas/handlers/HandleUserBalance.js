import { call, put, takeLatest } from "redux-saga/effects";
import { ACTION_TYPE } from "../../../components/constants/Constants";
import { setUserBalance } from "../../actions";
import { updateBalanceInDocument } from "../../../firebaseFirestore/FirebaseFunctions";
function* handleBalance(action) {
  try {
    yield call(
      updateBalanceInDocument,
      action.payload.balance,
      action.payload.uid
    );
    yield put(setUserBalance(action.payload.balance));
  } catch (error) {
    alert("error while handling balance : ", error);
  }
}

export default function* watcherBalance() {
  yield takeLatest(ACTION_TYPE.GET_USER_BALANCE, handleBalance);
}
