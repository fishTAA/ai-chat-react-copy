import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../pages/app/App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
