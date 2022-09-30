import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClient, IDocument, IQuery, IService } from "../models/models";

export const crmApi = createApi({
  reducerPath: "crm/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://213.226.126.113:3000/api/",
    // mode:"no-cors"
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
    getClientOptions: build.query<any, {}>({
      query: (title) => ({
        url: `/client-options`,
        params:title
      }),
    }),
    updateClient: build.query<any, IClient>({
      query: (obj) => ({
        url: `/client/${obj.id}`,
        body: obj,
        method: "PUT",
      }),
    }),
    deleteClient: build.query<any, number>({
      query: (id) => ({
        url: `/client/${id}`,
        method: "DELETE",
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
    getServiceOptions: build.query<any, {}>({
      query: (title) => ({
        url: `/service-options`,
        params:title
      }),
    }),
    updateService: build.query<any, IService>({
      query: (obj) => ({
        url: `/service/${obj.id}`,
        body: obj,
        method: "PUT",
      }),
    }),
    deleteService: build.query<any, number>({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
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
    deleteDocument: build.query<any, number>({
      query: (id) => ({
        url: `/document/${id}`,
        method: "DELETE",
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
  useGetClientOptionsQuery,
  useLazyGetClientOptionsQuery,
  useUpdateClientQuery,
  useLazyUpdateClientQuery,
  useLazyCreateClientQuery,
  useLazyDeleteClientQuery,
  useLazyGetServicesQuery,
  useGetServiceOptionsQuery,
  useLazyUpdateServiceQuery,
  useLazyDeleteServiceQuery,
  useLazyCreateServiceQuery,
  useLazyGetDocumentsQuery,
  useLazyCreateDocumentQuery,
  useLazyUpdateDocumentQuery,
  useLazyDeleteDocumentQuery
} = crmApi;
