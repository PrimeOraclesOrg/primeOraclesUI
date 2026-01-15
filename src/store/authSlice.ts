import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export interface AuthState {
  user?: User;
  isAuthFetching: boolean;
}

const initialState: AuthState = {
  isAuthFetching: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthFetching = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthFetching = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { clearUser, setUser } = authSlice.actions;
