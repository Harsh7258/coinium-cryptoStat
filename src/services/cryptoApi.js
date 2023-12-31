import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Note: Change v1 to v2 on rapid api

const cryptoApiHeaders = {
  // 'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  // 'x-rapidapi-key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
    'x-access-token': import.meta.env.VITE_COINRANKING_APIKEY,
};
// const baseUrl = 'https://coinranking1.p.rapidapi.com';
const baseUrl = import.meta.env.VITE_BASE_URL;
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
     getCryptosHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
  }),
});

export const  {
    useGetCryptosQuery, 
    useGetCryptosDetailsQuery,
    useGetCryptosHistoryQuery
} = cryptoApi;