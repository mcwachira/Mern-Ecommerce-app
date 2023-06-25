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

        logout:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/logout`,
                method: 'POST',

            }),

        }),

    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation ,useUpdateUserMutation} = usersApiSlice