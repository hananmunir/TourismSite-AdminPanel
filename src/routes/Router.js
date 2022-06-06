import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Packages = lazy(() => import("../views/ui/Packages.js"));

const Users = lazy(() => import("../components/dashboard/UserTable.js"));
const SignIn = lazy(() => import("../components/Auth/SignIn"));

const user = localStorage.getItem("TourismSecurityTokenAdmin");

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to='/starter' /> },
      {
        path: "/starter",
        exact: true,
        element: user ? <Starter /> : <Navigate to='/signin' />,
      },

      {
        path: "/packages",
        exact: true,
        element: user ? <Packages /> : <Navigate to='/signin' />,
      },
      {
        path: "/about",
        exact: true,
        element: user ? <Users /> : <Navigate to='/signin' />,
      },
    ],
  },
  { path: "/signin", exact: true, element: user ? <Starter /> : <SignIn /> },
];

export default ThemeRoutes;
