import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function AdminListComponent() {
  const token = Cookies.get("adminToken");
  const [admin, setAdmin] = useState([]);

  const getAllAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pkmk-javac/admin/get-all-admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setAdmin(result.admin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAdmin();
  }, []);
  return (
    <div className=" font-openSans">
      <h1 className=" text-xl font-extrabold">Customer List</h1>
      <div className=" flex flex-col justify-center gap-8 pt-10 max-h-[500px] overflow-scroll">
        {admin.map((item) => {
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
