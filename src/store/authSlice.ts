import { UserProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export interface AuthState {
  user?: User;
  profile?: UserProfile;
  isAuthFetching: boolean;
  isProfileFetching: boolean;
}

const initialState: AuthState = {
  isAuthFetching: true,
  isProfileFetching: true,
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
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isProfileFetching = false;
      console.log("Profile set");
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isProfileFetching = false;
      console.log("Profile clear");
    },
  },
});

export const authReducer = authSlice.reducer;
export const { clearUser, setUser, setProfile, clearProfile } = authSlice.actions;
