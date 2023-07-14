import { ACTION_TYPE } from "../../components/constants/Constants";

export const getUserBalance = () => ({
  type: ACTION_TYPE.GET_USER_BALANCE,
});

export const setUserBalance = (balance) => ({
  type: ACTION_TYPE.SET_USER_BALANCE,
  payload: balance,
});

export const getUserCurrencies = () => ({
  type: ACTION_TYPE.GET_USER_CURRENCIES,
});

export const setUserCurrencies = (currencies) => ({
  type: ACTION_TYPE.SET_USER_CURRENCIES,
  payload: currencies,
});

export const getUserAuth = () => ({
  type: ACTION_TYPE.GET_USER_AUTH,
});

export const setUserAuth = (AuthState) => ({
  type: ACTION_TYPE.SET_USER_AUTH,
  payload: AuthState,
});

export const getUserImage = () => ({
  type: ACTION_TYPE.GET_USER_IMAGE,
});

export const setUserImage = (image) => ({
  type: ACTION_TYPE.SET_USER_IMAGE,
  payload: image,
});

export const getSuccessModal = () => ({
  type: ACTION_TYPE.GET_SUCCESS_MODAL,
});

export const setSuccessModal = (modalProperty) => ({
  type: ACTION_TYPE.SET_SUCCESS_MODAL,
  payload: modalProperty,
});

export const getErrorModal = () => ({
  type: ACTION_TYPE.GET_ERROR_MODAL,
});

export const setErrorModal = (modalProperty) => ({
  type: ACTION_TYPE.SET_ERROR_MODAL,
  payload: modalProperty,
});

export const getCryptoData = () => ({
  type: ACTION_TYPE.GET_CRYPTO_DATA,
});

export const setCryptoData = (coins) => ({
  type: ACTION_TYPE.SET_CRYPTO_DATA,
  payload: coins,
});

export const getWatchlistCoins = () => ({
  type: ACTION_TYPE.GET_WATCHLIST_COINS,
});

export const setWatchlistCoins = (coins) => ({
  type: ACTION_TYPE.SET_WATCHLIST_COINS,
  payload: coins,
});

export const getUserDetails = () => ({
  type: ACTION_TYPE.GET_USER_DETAILS,
});

export const setUserDetails = (user) => ({
  type: ACTION_TYPE.SET_USER_DETAILS,
  payload: user,
});
