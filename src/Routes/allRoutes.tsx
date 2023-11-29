import React from "react";
import {Navigate} from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/sair", component: <Logout /> },
  { path: "/entrar", component: <Login /> },
  { path: "/recuperar-senha", component: <ForgetPasswordPage /> },
  { path: "/registro", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };