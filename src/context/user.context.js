import reducer, { initialState } from "./auth.reducer";
import makeStore from "./make.store";

const [UserProvider, useUserStore, useUserDispatch] = makeStore(
  reducer,
  initialState
);

export { UserProvider, useUserStore, useUserDispatch };
