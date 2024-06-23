import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function LandingAdminWrapperComponent() {
  const token = Cookies.get("adminToken");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token]);

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
    <div className=" flex font-sora w-screen h-screen">
      <div className=" basis-1/6 flex flex-col items-start border-r border-slate-300">
        <div className=" basis-1/12 flex items-center justify-center text-lg w-full">
          <h1 className="">Welcome</h1>
        </div>
        <div className=" basis-3/12 w-full flex flex-col gap-3 items-center justify-start">
          <div className=" w-[150px] h-[150px]">
            <img
              className=" w-full h-full object-cover"
              src="/logo.png"
              alt=""
            />
          </div>
          <div className=" text-center">
            <p className=" text-xl">Djamet</p>
            <p className=" text-xs text-slate-500">Djamet@gmail.com</p>
          </div>
        </div>
        <div className=" basis-7/12 flex flex-col gap-5 items-center w-full text-slate-500 pt-14">
          <div className=" flex items-center gap-6 justify-start text-base w-[200px]">
            <IoHomeOutline size={28} />
            <Link to={"/landing-admin/dashboard"}>Dashboard</Link>
          </div>
          <div className="flex items-center gap-6 justify-start text-base w-[200px]">
            <IoCartOutline size={28} />
            <Link to={"/landing-admin/product"}>Product</Link>
          </div>
          <div className="flex items-center gap-6 justify-start text-base w-[200px]">
            <AiOutlineUserDelete size={28} />
            <Link to={"/landing-admin/customer"}>Customer</Link>
          </div>
        </div>
        <div className=" basis-1/12 flex flex-col gap-5 items-center justify-center w-full text-slate-500">
          <div className=" flex items-center gap-6 justify-start text-base w-[200px]">
            <CgLogOut size={28} />
            <button onClick={logOutHandler}>
              {isLoading ? "logging out ..." : "Log out"}
            </button>
          </div>
        </div>
      </div>
      <div className=" basis-5/6 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
