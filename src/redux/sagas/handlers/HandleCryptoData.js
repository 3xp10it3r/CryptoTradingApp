import { call, put, takeLatest } from "redux-saga/effects";
import { ACTION_TYPE } from "../../../components/constants/Constants";
import { setCryptoData } from "../../actions";
import { requestCryptoData } from "../../Api";

export function* handleGetCryptos() {
  try {
    const response = yield call(requestCryptoData);
    const { data } = response;
    yield put(setCryptoData(data));
  } catch (error) {
    alert(error);
  }
}

export default function* watcherAPISaga() {
  yield takeLatest(ACTION_TYPE.GET_CRYPTO_DATA, handleGetCryptos);
}
