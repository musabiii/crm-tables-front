import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClient, IQuery } from "../models/models";

export const crmApi = createApi({
  reducerPath: "crm/api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://89.108.98.131:3000/api/",
    baseUrl: "http://localhost:4000/api/",
  }),
  endpoints: (build) => ({
    getClients: build.query<IClient[],IQuery>({
      query: (query) => ({
        // url: `/comments/?id=1`,
        url: `/client`,
        params: query
      }),
    }),
    getClient:build.query<any,number>({
      query: (id) => ({
        url: `/client/${id}`,
      }),
    }),
    updateClient:build.query<any,IClient>({
      query: (obj) => ({
        url: `/client/${obj.id}`,
        body:obj,
        method:"PUT"
      }),
    }),
    createClient:build.query<any,IClient>({
      query: (obj) => ({
        url: `/client/`,
        body:obj,
        method:"POST"
      }),
    }),
  }),
});

export const { useGetClientsQuery,useLazyGetClientsQuery, useLazyGetClientQuery,useUpdateClientQuery,useLazyUpdateClientQuery, useLazyCreateClientQuery } = crmApi;
