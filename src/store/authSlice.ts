import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAuthEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsAuthenticated, setAuthEmail } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
