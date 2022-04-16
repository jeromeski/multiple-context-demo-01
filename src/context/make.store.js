// import localforage from "localforage";
import React from "react";

// const getLocalStorageItem = async () => {
//   let data = await localforage.getItem("auth");
//   data = JSON.parse(data);
//   if (!data) {
//     return initialState;
//   }
//   return data;
// };

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export default function makeStore(reducer, initialState) {
  const storeContext = React.createContext();
  const dispatchContext = React.createContext();

  const StoreProvider = ({ children }) => {
    const [store, dispatch] = React.useReducer(reducer, initialState);

    // const loginUser = (data) => {
    //   return dispatch({ type: LOGIN_USER, payload: data });
    // };

    // const logoutUser = () => {
    //   return dispatch({ type: LOGOUT_USER });
    // };

    // const _dispatch = { loginUser, logoutUser };

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  function useStore() {
    return React.useContext(storeContext);
  }

  function useDispatch() {
    return React.useContext(dispatchContext);
  }

  return [StoreProvider, useStore, useDispatch];
}
