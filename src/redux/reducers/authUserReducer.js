import { SET_LOGOUT_STATUS, SET_AUTH_USER_DETAILS } from "../types";

const initialState = {
  username: "",
  emailId: "",
  isAuthenticated: false,
  profilePic: "",
  fullName: "",
};

export const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DETAILS:
      return {
        username: action.payload.givenName,
        fullName: action.payload.name,
        profilePic: action.payload.imageUrl,
        emailId: action.payload.email,
        isAuthenticated: true,
      };
    case SET_LOGOUT_STATUS: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};
