import { SET_LOGOUT_STATUS, SET_AUTH_USER_DETAILS } from "../types";

export const setLogoutStatus = () => {
  return (dispatch) => dispatch({ type: SET_LOGOUT_STATUS });
};

export const setAuthUserDetails = (userDetails) => {
  return (dispatch) => {
    dispatch({ type: SET_AUTH_USER_DETAILS, payload: userDetails });
  };
};
