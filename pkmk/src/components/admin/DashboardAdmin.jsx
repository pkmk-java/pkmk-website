import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
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
  const [isLoading, setIsLoading] = useState(false);

  const [defaultBG, setDefaultBG] = useState({
    totalAdmin: "bg-slate-50 text-black",
    totalCustomer: "bg-slate-50 text-black",
    totalProduct: "bg-slate-50 text-black",
  });

  const getStatistic = async () => {
    try {
      setIsLoading(true);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
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
    <div className=" basis-11/12 pt-10 h-full w-[800px] flex flex-col font-raleway">
      <div className=" basis-1/12 flex flex-col gap-1 items-start justify-center">
        <h1 className=" text-3xl font-extrabold">Dashboard</h1>
        <p className=" text-slate-500">
          Welcome to dashboard, click on every total to check
        </p>
      </div>
      <div className=" basis-3/12 flex gap-6 w-full pt-5">
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
          {isLoading ? (
            <p>
              <BeatLoader color="white" size={9} />
            </p>
          ) : (
            <p>{totalProduct} product</p>
          )}
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
          {isLoading ? (
            <p>
              <BeatLoader color="black" size={9} />
            </p>
          ) : (
            <p>{totalCustomer} customer</p>
          )}
        </Link>
        <Link
          to={"/landing-admin/dashboard/total-admin"}
          className={`w-full h-[130px] rounded-2xl border ${defaultBG.totalAdmin} p-3 flex flex-col justify-between`}
        >
          <div className=" flex justify-between items-center">
            <h1 className=" font-extrabold">Total Admin</h1>
            <div className=" bg-stone-500 text-white p-2 rounded-full">
              <IoSettingsOutline size={20} />
            </div>
          </div>
          {isLoading ? (
            <p>
              <BeatLoader color="black" size={9} />
            </p>
          ) : (
            <p>{totalAdmin} admin</p>
          )}
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
