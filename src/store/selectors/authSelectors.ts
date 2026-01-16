import { AuthState } from "../authSlice";

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthIsFetching = (state: { auth: AuthState }) => state.auth.isAuthFetching;