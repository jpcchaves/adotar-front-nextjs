import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

// Auth Inner
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";

//login
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
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

  { path: "*", exact: true, component: <Cover404 /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/sair", component: <Logout /> },
  { path: "/entrar", component: <Login /> },
  { path: "/recuperar-senha", component: <ForgetPasswordPage /> },
  { path: "/registro", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
