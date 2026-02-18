import { FullProfile } from "@/types";
import { baseApi } from "./baseApi";
import { getUserProfile, updateProfile } from "@/services";
import { UpdateProfileFormData } from "@/utils/validators/updateProfile";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<FullProfile | null, void>({
      queryFn: async () => {
        const { data, error } = await getUserProfile();

        if (error) {
          return { data: null };
        }

        return { data };
      },
      providesTags: ["User"],
    }),
    updateMyProfile: builder.mutation<
      FullProfile | null,
      { formData: UpdateProfileFormData; avatarToDelete?: string }
    >({
      queryFn: async ({ formData, avatarToDelete }) => {
        const { data, error } = await updateProfile(formData, avatarToDelete);

        if (error) {
          return { error };
        }

        return { data };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = usersApi;
