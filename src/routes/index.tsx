import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../pages/app/App";
import Manage from "../pages/manage";
import FullChat from "../pages/app/FullChat";
import ViewSolution from "../pages/app/ViewSolution";
import Login from "../pages/login/login";
import { Homepage } from "../pages/uiRevamped/homepage";
import UiRevampView from "../pages/uiRevamped/viewRevampled";
import { NavigationBar } from "../components/NavigationBar";
export const routes = createBrowserRouter([
  {
    path: "/login",

    element: <Login />,
  },
  {
    path: "/",

    // element: <App />,
    element: <Homepage />,
  },
  {
    path: "/manage",
    element: <Manage />,
  },
  {
    path: "/full-chat",
    element: <FullChat />,
  },
  {
    path: "/view-solution/:id/:query",
    element: <ViewSolution />,
  },
  {
    path: "/viewrework",
    element: <> <UiRevampView /></>
  }
 
]);
