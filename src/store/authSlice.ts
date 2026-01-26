import { FullProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  profile: FullProfile | null;
  isAuthFetching: boolean;
  isProfileFetching: boolean;
}

const initialState: AuthState = {
  user: null,
  profile: null,
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
    setProfile: (state, action: PayloadAction<FullProfile>) => {
      const processAvatarPath = (avatarPath: string) => {
        /* if user uploads new avatar - browser caches old one, so we update link every time to always have current avatar image  */
        if (avatarPath.includes("default_avatars")) return avatarPath;
        return `${avatarPath}?v=${new Date().getTime()}`;
      };

      state.profile = {
        ...action.payload,
        avatar_path: processAvatarPath(action.payload.avatar_path),
      };
      state.isProfileFetching = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isProfileFetching = false;
    },
    authClearAll: (state) => {
      state.profile = null;
      state.user = null;
      state.isProfileFetching = false;
      state.isAuthFetching = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { clearUser, setUser, setProfile, clearProfile, authClearAll } = authSlice.actions;
