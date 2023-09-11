import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../pages/app/App";
import Manage from "../pages/manage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manage",
    element: <Manage />
  }
]);
