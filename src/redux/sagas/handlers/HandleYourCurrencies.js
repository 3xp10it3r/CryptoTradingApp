import { call, put, takeLatest } from "redux-saga/effects";
import { ACTION_TYPE } from "../../../components/constants/Constants";
import { setUserCurrencies } from "../../actions";

import { updateYourCurrenciesInDocument } from "../../../firebaseFirestore/FirebaseFunctions";
function* handleYourCurrencies(action) {
  try {
    yield call(
      updateYourCurrenciesInDocument,
      action.payload.your_currencies,
      action.payload.uid
    );
    yield put(setUserCurrencies(action.payload.your_currencies));
  } catch (error) {
    alert("error while handling bought currencies : ", error);
  }
}

export default function* watcherYourCurrencies() {
  yield takeLatest(ACTION_TYPE.GET_USER_CURRENCIES, handleYourCurrencies);
}
