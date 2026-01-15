import { AuthState } from "../authSlice";

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;