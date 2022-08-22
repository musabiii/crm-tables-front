import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClient } from "../models/models";

export const crmApi = createApi({
  reducerPath: "crm/api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://89.108.98.131:3000/api/",
    baseUrl: "http://localhost:4000/api/",
    // baseUrl: "https://jsonplaceholder.typicode.com/",
    // mode: "no-cors",
  }),
  endpoints: (build) => ({
    getClients: build.query<IClient[],null>({
      query: () => ({
        // url: `/comments/?id=1`,
        url: `/client`,
      }),
    }),
    getClient:build.query<any,number>({
      query: (id) => ({
        url: `/client/${id}`,
      }),
    }),
  }),
});

export const { useGetClientsQuery,useLazyGetClientsQuery, useLazyGetClientQuery } = crmApi;
