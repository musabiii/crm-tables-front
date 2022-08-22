import { configureStore } from "@reduxjs/toolkit";
import { crmApi } from "./crm.api";

export const store = configureStore({
  reducer: {
    [crmApi.reducerPath]: crmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crmApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
