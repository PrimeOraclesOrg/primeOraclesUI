import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthView = "login" | "register" | "forgot-password" | "confirm-code" | "reset-password";
export type AuthCodeMode = "signup" | "recovery";

interface AuthModalState {
  isOpen: boolean;
  view: AuthView;
  codeMode: AuthCodeMode;
  email: string;
  routeAfterLogin: string | null;
}

const initialState: AuthModalState = {
  isOpen: false,
  view: "login",
  codeMode: "signup",
  email: "",
  routeAfterLogin: null,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<AuthView>) => {
      state.isOpen = true;
      state.view = action.payload || "login";
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

    setRouteAfterLogin: (state, action: PayloadAction<string | null>) => {
      state.routeAfterLogin = action.payload;
    },
  },
});

export const authModalReducer = authModalSlice.reducer;
export const {
  openAuthModal,
  closeAuthModal,
  setAuthModalView,
  setAuthModalCodeMode,
  setAuthModalEmail,
} = authModalSlice.actions;
export const selectAuthModal = (state: { authModal: AuthModalState }) => state.authModal;
