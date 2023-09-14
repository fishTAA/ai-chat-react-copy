import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../pages/app/App";
import Manage from "../pages/manage";
import FullChat from "../pages/app/FullChat";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manage",
    element: <Manage />
  },
  {
    path: "/full-chat",
    element: <FullChat />
  }
]);
