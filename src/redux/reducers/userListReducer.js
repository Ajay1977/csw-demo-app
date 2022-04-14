import { SET_SELECTED_USER, SET_USER_LIST } from "../types";

const initialState = {
  users: [],
  selectedUser: {},
};

export const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        users: action.payload,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: state.users.find((user) => user.id === action.payload),
      };
    default:
      return state;
  }
};
