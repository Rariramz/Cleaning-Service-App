import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://aleksyy.ddns.net:60303/api',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', 'http://aleksyy.ddns.net:60303');
      // headers.set('Access-Control-Allow-Origin', '*');
      // headers.set('Content-Type', 'application/json');
      const token = getState().user.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers
    },
  }),
  tagtypes: ['Order', 'User', 'Image', 'Address', 'Cleaner'],
  endpoints: (builder) => ({
    // USER
    register: builder.mutation({
      query: ({ firstName, lastName, email, mobile, password }) => ({
        url: `users/register?firstName=${firstName}&lastName=${lastName}&email=${email}&mobile=${mobile}&password=${password}`,
        method: 'POST',
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `users/login?email=${email}&password=${password}`,
        method: 'POST',
      }),
    }),
    getUser: builder.query({
      query: () => `users/info`,
      providesTags: ['User', 'Image'],
    }),
    getUserById: builder.mutation({
      query: ({ id }) => `users/${id}`,
    }),
    getUserRole: builder.query({
      query: () => `users/role`,
      providesTags: ['User'],
    }),


    // IMAGE
    getImage: builder.mutation({
      query: ({ id }) => ({
        url: `images/${id}`,
        responseHandler: (response) => response.blob(),
        cache: 'no-cache'
      }),
      providesTags: ['Image'],
    }),
    setImage: builder.mutation({
      query: (formData) => ({
        url: `images/set`,
        method: 'POST',
        body: formData,
      }),
      providesTags: ['Image'],
      invalidatesTags: ['User', 'Image']
    }),
    setUserAddress: builder.mutation({
      query: ({ city, street, building, block, floor, appartment}) => ({
        url: `addresses/set?city=${city}&street=${street}&building=${building}
        &block=${block}&floor=${floor}&appartment=${appartment}`,
        method: 'POST',
      }),
      providesTags: ['Address'],
    }),

    // ADDRESS
    getAddressById: builder.mutation({
      query: ({ id }) => `/addresses/${id}`, 
      transformResponse: (response, meta, arg) => response.city,
      providesTags: ['Address'],
    }),

    // CLEANER
    getAllPendingOrders: builder.mutation({
      query: () => `cleaners/orders`,
      providesTags: ['Cleaner'],
    }),
    getCleanerActiveOrders: builder.mutation({
      query: () => `cleaners/orders/my`,
      providesTags: ['Cleaner'],
    }),
    takeOrder: builder.mutation({
      query: ({ id }) => ({
        url: `cleaners/orders/${id}/take`,
        method: 'PUT',
      }),
      providesTags: ['Cleaner'],
    }),
    completeOrder: builder.mutation({
      query: ({ id }) => ({
        url: `cleaners/orders/${id}/complete`,
        method: 'PUT',
      }),
      providesTags: ['Cleaner'],
    }),


    // ORDER
    getOrdersByType: builder.mutation({
      query: ({ type }) => `orders/my/${type}`,
      providesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: ({ id }) => `orders/${id}`, 
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
    getStatusByOrderId: builder.mutation({
      query: ({ id }) => ({
        url: `/orders/${id}/status`,
        responseHandler: (response) => response.text(),
      }),
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
    getOrderDetails: builder.mutation({
      query: ({ id }) => `orders/${id}/details`, 
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
    createOrder: builder.mutation({
      query: ({
        homeSquareMeters,
        bedrooms,
        bathrooms,
        changeBedsheets,
        dustingBlinds,
        fridgeCleaning,
        ovenCleaning,
        windowCleaning,
        washDryLaundry,
        cabinetCleaning,
        baseboardCleaning,
      }) => ({
        url: `/orders/create?roomSquareM=${homeSquareMeters}&nBedrooms=${bedrooms}&nBathrooms=${bathrooms}&changeBedSheets=${changeBedsheets}&dustingBlinds=${dustingBlinds}&cabinetCleaning=${cabinetCleaning}&ovenCleaning=${ovenCleaning}&windowCleaning=${windowCleaning}&washDryLaundry=${washDryLaundry}&baseboardCleaning=${baseboardCleaning}&fridgeCleaning=${fridgeCleaning}`,
        method: 'POST',
      }),
      invalidatesTags: ['Order']
    }),
    getOrderPaymentLink: builder.mutation({
      query: ({ id }) => ({
        url: `/orders/${id}/payment`,
        responseHandler: (response) => response.text(),
      }),
    })
  }),
})

export const {
  useSetUserAddressMutation, useGetUserRoleQuery,
  useGetUserQuery, useGetUserByIdMutation,
  useRegisterMutation, useLoginMutation,
  useSetImageMutation, useGetImageMutation,
  useCreateOrderMutation, useGetOrderByIdQuery,
  useGetStatusByOrderIdMutation, useGetOrderDetailsMutation,
  useGetOrdersByTypeMutation, useGetOrderPaymentLinkMutation,
  useGetAllPendingOrdersMutation, useGetAddressByIdMutation,
  useGetCleanerActiveOrdersMutation, useTakeOrderMutation, useCompleteOrderMutation } = api;