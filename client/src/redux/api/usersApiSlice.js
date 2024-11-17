import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";
import { logout } from "../features/auth/authSlice";

export const userApiSlce = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/auth`,
                method: 'post',
                body: data
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'post'
            })
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'post',
                body: data
            })
        }),

        profile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: "put",
                body: data
            })
        }),

        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),

        deleteUser: builder.mutation({
            query: userId => ({
                url: `${USERS_URL}/${userId}`,
                method: "delete"
            }),
            invalidatesTags: ['User']   
        }),

        getUserDetails: builder.query({
            query: id => ({
                url: `${USERS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        }),

        updateUser: builder.mutation({
            query: (data) =>  ({
                url: `${USERS_URL}/${data._id}`,
                method: 'put',
                body: data,
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useLoginMutation ,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = userApiSlce