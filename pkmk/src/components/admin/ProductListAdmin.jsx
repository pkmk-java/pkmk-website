import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function ProductListAdmin() {
  const token = Cookies.get("adminToken");
  const [product, setProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pkmk-javac/admin/get-all-product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setProduct(result.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div>
      <h1 className=" text-xl font-extrabold">Product List Admin</h1>
      <div className=" mt-3">
        {product.map((item) => {
          return (
            <>
              <div className=" border rounded-2xl h-full p-3">
                <div className=" w-[200px] h-[200px]">
                  <img
                    className=" w-full h-full object-cover"
                    src={item.productImage}
                    alt=""
                  />
                </div>
                <p>{item.productName}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
