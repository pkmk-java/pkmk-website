import axios from "axios";
import Navbar from "./Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LandingComponent() {
  const token = Cookies.get("toke");
  console.log(token);

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pkmk-javac/user/get-all-product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div className=" w-screen h-screen">
      <Navbar />
      <h1>Hello world</h1>
    </div>
  );
}
