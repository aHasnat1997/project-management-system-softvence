import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { TJwtPayload } from "../../types";

type TInitialState = {
  token: null | string;
  user: null | TJwtPayload | JwtPayload;
};

const initialState: TInitialState = {
  token: null,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      const decodeUserData = jwtDecode(action.payload);
      state.token = action.payload;
      state.user = decodeUserData;
    },
    removeUserInfo: (state) => {
      state.token = null;
      state.user = null;
    }
  }
});

export const { storeUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;