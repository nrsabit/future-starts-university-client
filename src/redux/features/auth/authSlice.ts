import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUserPayload = {
  id: string;
  role : string;
  iat : number;
  exp : number;
}

type StateType = {
  user: null | TUserPayload;
  token: null | string;
};

const initialState: StateType = {
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
