import { call, put, takeLatest } from "redux-saga/effects";
import { ACTION_TYPE } from "../../../components/constants/Constants";
import { setUserImage } from "../../actions";
import { updateUserImageInDocument } from "../../../firebaseFirestore/FirebaseFunctions";
function* handleUserImage(action) {
  try {
    yield call(
      updateUserImageInDocument,
      action.payload.image,
      action.payload.uid
    );
    yield put(setUserImage(action.payload.image));
  } catch (error) {
    alert("error while handling userImage : ", error);
  }
}

export default function* watcherUserImage() {
  yield takeLatest(ACTION_TYPE.GET_USER_IMAGE, handleUserImage);
}
