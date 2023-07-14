import { all } from "redux-saga/effects";

import watcherAPISaga from "./handlers/HandleCryptoData";

import watcherWatchlist from "./handlers/handleWatchlist";

import watcherBalance from "./handlers/HandleUserBalance";

import watcherYourCurrencies from "./handlers/HandleYourCurrencies";

import watcherUserImage from "./handlers/HandleUserImage";

export default function* rootSaga() {
  yield all([
    watcherAPISaga(),
    watcherWatchlist(),
    watcherBalance(),
    watcherYourCurrencies(),
    watcherUserImage(),
  ]);
}
