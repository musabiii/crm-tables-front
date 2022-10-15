import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { store } from "./store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { crmApi } from "./store/crm.api";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Clients from "./pages/clients";
import Services from "./pages/services";
import Documents from "./pages/documents";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <Provider store={store}>
  <ApiProvider api={crmApi}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </HashRouter>
  </ApiProvider>
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
