import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./states/index.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import LoginInput from "./components/LoginInput.jsx";
import RegisterInput from "./components/RegisterInput.jsx";
import AuthComponent from "./components/AuthComponent.jsx";
import AdminWrapperComponent from "./components/admin/AdminAuthComponent.jsx";
import AdminLoginComponent from "./components/admin/LoginComponent.jsx";
import AdminRegisterComponent from "./components/admin/RegistComponent.jsx";
import LandingAdminWrapperComponent from "./components/admin/LandingAdmin.jsx";
import DashboardAdminComponent from "./components/admin/DashboardAdmin.jsx";
import ProductHandlerComponent from "./components/admin/ProductComponent.jsx";
import CustomerHandlerComponent from "./components/admin/CustomerHandler.jsx";
import ProductListAdmin from "./components/admin/ProductListAdmin.jsx";
import CustomerListAdmin from "./components/admin/CustomerListAdmin.jsx";
import AdminListComponent from "./components/admin/AdminListAdmin.jsx";
import AdminIncomeComponent from "./components/admin/IncomeAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthComponent />,
    children: [
      {
        path: "login",
        element: <LoginInput />,
      },
      {
        path: "register",
        element: <RegisterInput />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminWrapperComponent />,
    children: [
      {
        path: "login",
        element: <AdminLoginComponent />,
      },
      {
        path: "register",
        element: <AdminRegisterComponent />,
      },
    ],
  },
  {
    path: "/landing-admin",
    element: <LandingAdminWrapperComponent />,
    children: [
      {
        path: "dashboard",
        element: <DashboardAdminComponent />,
        children: [
          {
            path: "total-product",
            element: <ProductListAdmin />,
          },
          {
            path: "total-customer",
            element: <CustomerListAdmin />,
          },
          {
            path: "total-admin",
            element: <AdminListComponent />,
          },
        ],
      },
      {
        path: "product",
        element: <ProductHandlerComponent />,
      },
      {
        path: "customer",
        element: <CustomerHandlerComponent />,
      },
      {
        path: "income",
        element: <AdminIncomeComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
