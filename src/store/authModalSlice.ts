import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthView = "login" | "register" | "forgot-password" | "confirm-code" | "reset-password";
export type AuthCodeMode = "signup" | "recovery";

interface AuthModalState {
  isOpen: boolean;
  view: AuthView;
  codeMode: AuthCodeMode;
  email: string;
}

const initialState: AuthModalState = {
  isOpen: false,
  view: "login",
  codeMode: "signup",
  email: "",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<AuthView>) => {
      state.isOpen = true;
      state.view = action.payload;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
    setAuthModalView: (state, action: PayloadAction<AuthView>) => {
      state.view = action.payload;
    },
    setAuthModalCodeMode: (state, action: PayloadAction<AuthCodeMode>) => {
      state.codeMode = action.payload;
    },
    setAuthModalEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export default authModalSlice.reducer;
export const {
  openAuthModal,
  closeAuthModal,
  setAuthModalView,
  setAuthModalCodeMode,
  setAuthModalEmail,
} = authModalSlice.actions;
