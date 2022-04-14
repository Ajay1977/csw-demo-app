import { SET_SELECTED_USER, SET_USER_LIST } from "../types";

export const setUserList = (userList) => {
  return (dispatch) => dispatch({ type: SET_USER_LIST, payload: userList });
};

export const setSelectedUser = (userId) => {
  return (dispatch) => dispatch({ type: SET_SELECTED_USER, payload: userId });
};
