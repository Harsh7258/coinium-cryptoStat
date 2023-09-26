import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Note: Change v1 to v2 on rapid api

const cryptoApiHeaders = {
    'x-access-token': 'coinranking477b3ed2ba4a0f1c48b8bcb770af6eb228b31b4f4f182ad3',
};
const baseUrl = 'https://api.coinranking.com/v2';
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      // count used to set limit of 10
    }),
    getCryptosDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
     }),
  }),
});

export const  {
    useGetCryptosQuery, useGetCryptosDetailsQuery
} = cryptoApi;