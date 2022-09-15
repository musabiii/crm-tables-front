import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClient, IDocument, IQuery, IService } from "../models/models";

export const crmApi = createApi({
  reducerPath: "crm/api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://89.108.98.131:3000/api/",
    baseUrl: "http://localhost:4000/api/",
  }),
  endpoints: (build) => ({
    getClients: build.query<IClient[], IQuery>({
      query: (query) => ({
        // url: `/comments/?id=1`,
        url: `/client`,
        params: query,
      }),
    }),
    getClient: build.query<any, number>({
      query: (id) => ({
        url: `/client/${id}`,
      }),
    }),
    updateClient: build.query<any, IClient>({
      query: (obj) => ({
        url: `/client/${obj.id}`,
        body: obj,
        method: "PUT",
      }),
    }),
    createClient: build.query<IClient, IClient>({
      query: (obj) => ({
        url: `/client/`,
        body: obj,
        method: "POST",
      }),
    }),
    getServices: build.query<IService[], IQuery>({
      query: (query) => ({
        // url: `/comments/?id=1`,
        url: `/service`,
        params: query,
      }),
    }),
    updateService: build.query<any, IService>({
      query: (obj) => ({
        url: `/service/${obj.id}`,
        body: obj,
        method: "PUT",
      }),
    }),
    createService: build.query<IClient, IService>({
      query: (obj) => ({
        url: `/service/`,
        body: obj,
        method: "POST",
      }),
    }),
    getDocuments: build.query<IDocument[], IQuery>({
      query: (query) => ({
        // url: `/comments/?id=1`,
        url: `/document`,
        params: query,
      }),
    }),
    updateDocument: build.query<any, IDocument>({
      query: (obj) => ({
        url: `/document/${obj.id}`,
        body: obj,
        method: "PUT",
      }),
    }),
    createDocument: build.query<IClient, IDocument>({
      query: (obj) => ({
        url: `/document/`,
        body: obj,
        method: "POST",
      }),
    }),

  }),
});

export const {
  useGetClientsQuery,
  useLazyGetClientsQuery,
  useLazyGetClientQuery,
  useUpdateClientQuery,
  useLazyUpdateClientQuery,
  useLazyCreateClientQuery,
  useLazyGetServicesQuery,
  useLazyUpdateServiceQuery,
  useLazyCreateServiceQuery,
  useLazyGetDocumentsQuery,
  useLazyCreateDocumentQuery,
  useLazyUpdateDocumentQuery,
} = crmApi;
