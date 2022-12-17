const INITIAL_AUTH_STATE = {
  isLoggedin: false,
};

export const authReducer = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return { ...state, isLoggedin: true, userSession: action.payload };
    case "AUTH_REFRESH":
      return { ...state, userSession: action.payload };
    case "AUTH_LOGOUT":
      return { ...state, isLoggedin: false, userSession: null };
    default:
      return state;
  }
};
