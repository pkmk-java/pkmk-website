import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardAdminComponent() {
  const [product, setProduct] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  console.log(product);
  const token = Cookies.get("adminToken");
  console.log(token);

  const location = useLocation();
  const current = location.pathname;
  console.log(current);

  const [defaultBG, setDefaultBG] = useState({
    totalAdmin: "bg-slate-50 text-black",
    totalCustomer: "bg-slate-50 text-black",
    totalProduct: "bg-slate-50 text-black",
  });

  const getStatistic = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pkmk-javac/admin/get-statistic",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setTotalAdmin(result.totalAdmin);
      setTotalProduct(result.totalProduct);
      setTotalCustomer(result.totalCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatistic();
  }, []);

  useEffect(() => {
    if (
      current === "/landing-admin/dashboard/total-product" ||
      current === "/landing-admin/dashboard"
    ) {
      setDefaultBG({
        totalAdmin: "bg-slate-50 text-black",
        totalCustomer: "bg-slate-50 text-black",
        totalProduct: "bg-black text-white",
      });
    }
    if (current === "/landing-admin/dashboard/total-customer")
      setDefaultBG({
        totalAdmin: "bg-slate-50 text-black",
        totalCustomer: "bg-black text-white",
        totalProduct: "bg-slate-50 text-black",
      });
    if (current === "/landing-admin/dashboard/total-admin")
      setDefaultBG({
        totalAdmin: "bg-black text-white",
        totalCustomer: "bg-slate-50 text-black",
        totalProduct: "bg-slate-50 text-black",
      });
  }, [current]);
  return (
    <div className=" h-full max-w-[800px] border-slate-300 border-r flex flex-col pl-9 pr-9 font-sora">
      <div className=" basis-1/12 flex items-center justify-start">
        <h1 className=" font-extrabold text-2xl">Dashboard</h1>
      </div>
      <div className=" basis-3/12 flex items-center gap-9 mb-9">
        <Link
          to={"/landing-admin/dashboard/total-product"}
          className={`w-full h-[130px] rounded-2xl border ${defaultBG.totalProduct} p-3 flex flex-col justify-between`}
        >
          <div className=" flex justify-between items-center">
            <h1 className=" font-extrabold">Total Product</h1>
            <div className=" bg-stone-500 text-white p-2 rounded-full">
              <IoCartOutline size={20} />
            </div>
          </div>
          <p className=" text-sm">{totalProduct} product</p>
        </Link>
        <Link
          to={"/landing-admin/dashboard/total-customer"}
          className={`w-full h-[130px] rounded-2xl border ${defaultBG.totalCustomer} p-3 flex flex-col justify-between`}
        >
          <div className=" flex justify-between items-center">
            <h1 className=" font-extrabold">Total Customer</h1>
            <div className=" bg-stone-500 text-white p-2 rounded-full">
              <AiOutlineUserDelete size={20} />
            </div>
          </div>
          <p className=" text-sm">{totalCustomer} customer</p>
        </Link>
        <Link
          to={"/landing-admin/dashboard/total-admin"}
          className={`w-full h-[130px] rounded-2xl border ${defaultBG.totalAdmin} p-3 flex flex-col justify-between`}
        >
          <div className=" flex justify-between items-center">
            <h1 className=" font-extrabold">Total Product</h1>
            <div className=" bg-stone-500 text-white p-2 rounded-full">
              <IoSettingsOutline size={20} />
            </div>
          </div>
          <p className=" text-sm">{totalAdmin} admin</p>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
