import { PRODUCT_URL, UPLOAD_URL } from "../features/constants";
import { apiSlice } from './apiSlice'

export const productApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: ({keyword}) => ({
                url: `${PRODUCT_URL}`,
                params: { keyword }
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),
        getProductById: builder.query({
            query: productId => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                {type: "Product", id: productId}
            ]
        }),
        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/getallproducts`,
            providesTags: ["Product"]
        }),
        getProductDetails: builder.query({
            query: productId => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: product => ({
                url: PRODUCT_URL,
                method: 'post',
                body: product
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: ({_id, ...product}) => ({
                url: `${PRODUCT_URL}/${_id}`,
                method: 'put',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: productId => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'delete'
            }),
            invalidatesTags: ['Product']
        }),
        createReview: builder.mutation({
            query: data => ({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: 'post',
                body: data
            })
        }),
        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
        }),
        getNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5
        }),
        uploadProductImage: builder.mutation({
            query: data => ({
                url: `${UPLOAD_URL}`,
                method: 'post',
                body: data,
            })
        }),

        getFilteredProducts: builder.query({
            query: ({checked, radio}) => ({
                url: `${PRODUCT_URL}/filtered-products`,
                method: 'post',
                body: {checked, radio}
            })
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetTopProductsQuery,
    useCreateReviewMutation,
    useGetNewProductsQuery,
    useUploadProductImageMutation,
    useGetFilteredProductsQuery
} = productApi