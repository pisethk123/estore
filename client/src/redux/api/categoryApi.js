import { apiSlice } from "./apiSlice";
import {CATEGORY_URL} from '../features/constants'

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createCategory: builder.mutation({
            query: data => ({
                url: `${CATEGORY_URL}`,
                method: 'post',
                body: data
            }),
            invalidatesTags: ['Category']
        }),

        updateCategory: builder.mutation({
            query: data => ({
                url: `${CATEGORY_URL}/${data._id}`,
                method: 'put',
                body: data
            })
        }),

        deleteCategory: builder.mutation({
            query: id => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['Category']
        }),

        getAllCategory: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`
            }),
            providesTags: ['Category']
        })
    })
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery
} = categoryApi