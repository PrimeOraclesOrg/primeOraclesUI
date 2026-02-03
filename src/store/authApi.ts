import { SignInCredentials, VerifyOtpCredentials } from "@/services/authService/types";
import { baseApi } from "./baseApi";
import { completeProfile, getCurrentUser, signIn, signOut, verifyOtp } from "@/services";
import { User } from "@supabase/supabase-js";
import { ProfileSetupFormData } from "@/utils";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUser: builder.query<User | null, void>({
      queryFn: async () => {
        console.log("User fetch started");
        console.time("User fetch finished in");

        const { data, error } = await getCurrentUser();
        console.timeEnd("User fetch finished in");

        if (error) return { data: null };

        return { data };
      },
      providesTags: ["AuthUser"],
    }),

    login: builder.mutation<null, SignInCredentials>({
      queryFn: async (credentials) => {
        const { error } = await signIn(credentials);

        if (error) return { error };

        return { data: null };
      },
      invalidatesTags: ["User", "AuthUser"],
    }),

    logout: builder.mutation<null, void>({
      queryFn: async () => {
        console.log("Logout started");
        console.time("Logout finished in");

        const { error } = await signOut();
        console.timeEnd("Logout finished in");

        if (error) return { error };

        return { data: null };
      },
      invalidatesTags: ["AuthUser", "User"],
    }),

    verifyOtp: builder.mutation<null, VerifyOtpCredentials>({
      queryFn: async (params) => {
        const { error } = await verifyOtp(params);

        if (error) return { error };

        return { data: null };
      },
      invalidatesTags: ["AuthUser", "User"],
    }),

    completeProfile: builder.mutation<null, ProfileSetupFormData>({
      queryFn: async (data) => {
        const { error } = await completeProfile({
          name: data.name,
          username: data.username,
          description: data.description,
          youtubeUrl: data.youtubeUrl,
          instagramUrl: data.instagramUrl,
          tiktokUrl: data.tiktokUrl,
          selectedAvatar: data.selectedAvatar,
          uploadedAvatar: data.uploadedAvatar,
        });

        if (error) return { error };

        return { data: null };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAuthUserQuery,
  useLogoutMutation,
  useVerifyOtpMutation,
  useCompleteProfileMutation,
} = authApi;
