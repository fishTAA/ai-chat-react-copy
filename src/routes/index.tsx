import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../pages/app/App";
import Manage from "../pages/manage";
import FullChat from "../pages/app/FullChat";
import ViewSolution from "../pages/app/ViewSolution";
import Login from "../pages/login/login";
import { MsalProvider } from "@azure/msal-react";
import { pca } from "../authconfig";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: (<MsalProvider instance={pca}><Login /></MsalProvider>)
  },
  {
    path: "/",
    // element: (<MsalProvider instance={pca}><App /></MsalProvider>)
    element: <App/>
  },
  {
    path: "/manage",
    element: <Manage />
  },
  {
    path: "/full-chat",
    element: <FullChat />
  },
  {
    path: "/view-solution/:id/:query",
    element: <ViewSolution />
  }
 
]);
