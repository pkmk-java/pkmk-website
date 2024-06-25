import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CustomerHandlerComponent() {
  const token = Cookies.get("adminToken");
  const [user, setUser] = useState([]);

  const getAllCustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pkmk-javac/admin/get-all-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, []);
  return (
    <div className=" basis-11/12 pt-10 h-full w-[800px] flex flex-col font-raleway">
      <div className=" basis-1/12">
        <h1 className=" font-extrabold text-xl">Customer List</h1>
      </div>
      <div className=" basis-10/12 flex flex-col gap-6 overflow-scroll">
        {user.map((item) => {
          return (
            <>
              <div
                className=" flex gap-4 items-center bg-slate-50 border rounded-xl p-4"
                key={item._id}
              >
                <div className=" w-[50px] h-[50px]">
                  {item.avatar === "" ? (
                    <img
                      className=" w-full h-full rounded-full object-cover border"
                      src="/userss.png"
                    />
                  ) : (
                    <img
                      className=" w-full h-full rounded-full object-cover"
                      src={item.avatar}
                      alt=""
                    />
                  )}
                </div>
                <div className=" flex flex-col h-full justify-between">
                  <p className=" text-base">{item.username}</p>
                  <p className=" text-xs">{item.email}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
