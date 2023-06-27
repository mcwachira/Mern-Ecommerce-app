import {USERS_URL} from "../constants";
import {apiSlice} from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({

        login:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/auth`,
                method: 'POST',
                body:data,
            }),

        }),
        register:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: (data) => ({
                url: USERS_URL,
            }),
            providesTags:['Users'],
            keepUnusedDataFor:5
        }),

        getUserDetails:builder.query({
            query:(userId) => ({
                url:`${USERS_URL}/${userId}`,

            }),
            keepUnusedDataFor:5

        }),

        updateUserAdmin: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['User']
        }),
        deleteUser:builder.mutation({
            query:(userId) => ({
                url:`${USERS_URL}/${userId}`,
                method: 'DELETE',

            }),

        }),

        logout:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/logout`,
                method: 'POST',

            }),

        }),

    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation ,useUpdateUserMutation,
    useDeleteUserMutation,useUpdateUserAdminMutation,
    useGetUsersQuery, useGetUserDetailsQuery} = usersApiSlice