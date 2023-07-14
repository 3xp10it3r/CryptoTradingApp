import firestore from "@react-native-firebase/firestore";
import { ACTION_TYPE } from "../components/constants/Constants";

const createDocument = async (uid, dispatch) => {
  try {
    const userRef = firestore().doc(`USERS/${uid}`);
    await userRef.get().then((snapshot) => {
      if (!snapshot.exists) {
        try {
          userRef.set({
            balance: 0,
            watchlist: [],
            your_currencies: [],
            userImage: "",
          });
        } catch (error) {
          console.log("Error :  ", error);
        }
      } else {
        const watchListCoins = snapshot.data().watchlist;
        const balance = snapshot.data().balance;
        const your_currencies = snapshot.data().your_currencies;
        const image = snapshot.data().userImage;
        dispatch({
          type: ACTION_TYPE.GET_WATCHLIST_COINS,
          payload: { watchListCoins, uid },
        });
        dispatch({
          type: ACTION_TYPE.GET_USER_BALANCE,
          payload: { balance, uid },
        });
        dispatch({
          type: ACTION_TYPE.GET_USER_CURRENCIES,
          payload: { your_currencies, uid },
        });
        dispatch({
          type: ACTION_TYPE.GET_USER_IMAGE,
          payload: {
            image,
            uid,
          },
        });
      }
    });
  } catch (error) {
    alert("createDoc : ", error);
  }
};

export function* updateWatchlistDocument(watchlist, uid) {
  const userRef = yield firestore().doc(`USERS/${uid}`);
  try {
    yield userRef.update({
      watchlist: watchlist,
    });
  } catch (error) {
    alert("watchlist : ", error);
  }
}

export function* updateBalanceInDocument(balance, uid) {
  console.log("INN");
  const userRef = yield firestore().doc(`USERS/${uid}`);
  try {
    yield userRef.update({
      balance: balance,
    });
  } catch (error) {
    alert("balance:", error);
  }
}

export function* updateYourCurrenciesInDocument(your_currencies, uid) {
  console.log("INN");
  const userRef = yield firestore().doc(`USERS/${uid}`);
  try {
    yield userRef.update({
      your_currencies: your_currencies,
    });
  } catch (error) {
    alert("your currencies:", error);
  }
}

export function* updateUserImageInDocument(image, uid) {
  console.log("INN");
  const userRef = yield firestore().doc(`USERS/${uid}`);
  try {
    yield userRef.update({
      userImage: image,
    });
  } catch (error) {
    alert("UserImage ::: > ", error);
  }
}
export default createDocument;
