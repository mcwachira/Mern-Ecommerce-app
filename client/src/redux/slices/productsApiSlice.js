import {ORDERS_URL, PRODUCTS_URL, UPLOADS_URL} from "../constants";
import {apiSlice} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({

        getProducts:builder.query({
            query:({pageNumber, keyword}) => ({
                url:PRODUCTS_URL,
                params:{
                    pageNumber,
                }
            }),
            providedTags:['Product'],
            keepUnusedDataFor:5,
        }),

        getProductDetails:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`
            }),
               keepUnusedDataFor:5
        }),

        createProduct:builder.mutation({
            query:() => ({
                url:PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags:['Products']

        }),

        updateProduct:builder.mutation({
            query:(data) => ({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body:data,
            }),
            invalidatesTags:['Product']

        }),

        uploadProductImage:builder.mutation({
            query:(data) => ({
                url:`${UPLOADS_URL}`,
                method: 'POST',
                body:data,
            }),


        }),

        deleteProduct:builder.mutation({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),


        }),

        createReview:builder.mutation({
            query:(data) => ({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body:data,
            }),

        invalidatesTags:['Product']
        }),

    }),
});

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation,
    useUploadProductImageMutation, useUpdateProductMutation,useCreateReviewMutation, useDeleteProductMutation} = productsApiSlice