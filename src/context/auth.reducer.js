export const initialState = {
  user: {
    uuid: "",
    password: "",
    role: "",
    data: {
      displayName: "",
      email: ""
    }
  },
  isAuth: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: { ...action.payload },
        isAuth: true
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: {},
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
