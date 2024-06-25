import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

export default function LandingAdminWrapperComponent() {
  const token = Cookies.get("adminToken");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultBG, setDefaulBG] = useState({
    dashboard: "",
    product: "",
    customer: "",
    income: "",
    help: "",
    settings: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token]);

  useEffect(() => {
    if (location.pathname === "/landing-admin/dashboard/total-product") {
      setDefaulBG({
        dashboard: "bg-blue-950 text-white",
        product: "",
        customer: "",
        income: "",
        help: "",
        settings: "",
      });
    }
    if (location.pathname === "/landing-admin/product") {
      setDefaulBG({
        dashboard: "",
        product: "bg-blue-950 text-white",
        customer: "",
        income: "",
        help: "",
        settings: "",
      });
    }
    if (location.pathname === "/landing-admin/customer") {
      setDefaulBG({
        dashboard: "",
        product: "",
        customer: "bg-blue-950 text-white",
        income: "",
        help: "",
        settings: "",
      });
    }
  }, [location]);

  const logOutHandler = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        Cookies.remove("adminToken");
        navigate("/admin/login");
      }, 4000);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-slate-100 flex font-raleway w-screen h-screen">
      <div className=" basis-1/6 flex flex-col items-start border-slate-300">
        <div className=" basis-1/12 flex items-center justify-center text-lg w-full">
          <h1 className="">PKMK Javabrown</h1>
        </div>
        <div className=" basis-11/12 flex flex-col gap-5 items-center justify-start w-full text-slate-800 pt-14 pl-10 pr-10">
          <div
            className={`${defaultBG.dashboard} h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg`}
          >
            <IoSpeedometerOutline size={25} />
            <Link to={"/landing-admin/dashboard/total-product"}>Dashboard</Link>
          </div>
          <div
            className={`${defaultBG.product} h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg`}
          >
            <IoCartOutline size={25} />
            <Link to={"/landing-admin/product"}>Product</Link>
          </div>
          <div
            className={`${defaultBG.customer} h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg `}
          >
            <AiOutlineUserDelete size={25} />
            <Link to={"/landing-admin/customer"}>Customer</Link>
          </div>
          <div className=" h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg">
            <FiDollarSign size={25} />
            <Link to={"/landing-admin/income"}>Income</Link>
          </div>
          <div className=" h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg">
            <IoHelpCircleOutline size={25} />
            <Link to={"/landing-admin/help"}>Help</Link>
          </div>
          <div className=" h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg">
            <IoSettingsOutline size={25} />
            <Link to={"/landing-admin/settings"}>Settings</Link>
          </div>
        </div>
        <div className=" basis-1/12 flex flex-col gap-5 items-center justify-center w-full text-slate-800 pl-10">
          <div className=" h-[50px] flex items-center gap-5 justify-start pl-10 text-sm w-full rounded-lg">
            <CgLogOut size={28} />
            <button onClick={logOutHandler}>
              {isLoading ? "logging out ..." : "Log out"}
            </button>
          </div>
        </div>
      </div>
      <div className=" basis-5/6 flex flex-col pl-10 pr-10">
        <div className=" basis-1/12 flex items-center justify-start w-full">
          <div className=" flex items-center h-[50px] gap-3 border border-slate-300 rounded-lg w-[600px] pl-3">
            <IoSearchOutline size={25} />
            <input
              className=" w-full h-full focus:outline-none bg-slate-100"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
