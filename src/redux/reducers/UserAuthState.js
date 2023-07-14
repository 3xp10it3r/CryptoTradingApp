import { ACTION_TYPE } from "../../components/constants/Constants";

const initialState = {
  AuthState: false,
};

const fetchUserAuthState = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER_AUTH:
      return { ...state, AuthState: action.payload };
    default:
      return state;
  }
};

export default fetchUserAuthState;
