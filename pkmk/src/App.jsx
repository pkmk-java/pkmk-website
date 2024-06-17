import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterPageAdmin from "./pages/RegisterAdminPage";
import LoginPageAdmin from "./pages/LoginAdmin";
import Dashboard from "./pages/DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncPreloadProcess } from "./states/isPreload/action";

export default function App() {

  const { isPreload = false } = useSelector(state => state.isPreload)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return null;
  }

  return (
    <div className=" h-screen w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/register" element={<RegisterPageAdmin />} />
        <Route path="/admin/login" element={<LoginPageAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
