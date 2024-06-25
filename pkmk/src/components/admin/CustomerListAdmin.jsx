import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CustomerListAdmin() {
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
    <div className=" font-openSans">
      <h1 className=" text-xl font-extrabold">Customer List</h1>
      <div className=" flex flex-col gap-8 pt-10 max-h-[600px] overflow-scroll">
        {user.map((item) => {
          return (
            <>
              <div className=" flex gap-4 items-center" key={item._id}>
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
