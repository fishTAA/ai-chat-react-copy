import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

import { CookiesProvider } from "react-cookie";
import { pca } from "./authconfig";
import { MsalProvider } from "@azure/msal-react";

// Create a React root and render your application inside it.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // Wrapping with React.StrictMode for development-time checks
  <React.StrictMode>
    {/* Wrap with CookiesProvider to manage cookies */}
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      {/* Wrap with MsalProvider for Microsoft Authentication Library integration */}
      <MsalProvider instance={pca}>
        {/* Wrap with RouterProvider */}
        <RouterProvider router={routes} />
      </MsalProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
