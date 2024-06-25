import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

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
      <h1 className=" text-xl font-extrabold font-raleway">Product List</h1>
      <div className=" mt-5 flex flex-col gap-10 bg-slate-50 border p-9 rounded-2xl max-h-[600px] overflow-scroll">
        {product.map((item) => {
          return (
            <>
              <div className=" flex gap-10 border p-2 rounded-xl">
                <div className=" rounded-2xl h-full">
                  <div className=" w-[200px] h-[200px]">
                    <img
                      className=" w-full h-full object-cover rounded-xl"
                      src={item.productImage}
                      alt=""
                    />
                  </div>
                </div>
                <div className=" flex flex-col justify-between text-slate-600">
                  <div>
                    <div className=" flex gap-3">
                      <p>Product Title :</p>
                      <p>{item.productName}</p>
                    </div>
                    <div className=" flex gap-3">
                      <p>Product Price :</p>
                      <p>{item.price}</p>
                    </div>
                    <div className=" flex gap-3">
                      <p>Product Description</p>
                      <p>{item.description}</p>
                    </div>
                    <div className=" flex gap-3">
                      <p>Stock</p>
                      <p>{item.stock}</p>
                    </div>
                  </div>
                  <div className=" flex gap-3">
                    <div className=" border flex items-center justify-center gap-3 bg-slate-100 h-[30px] w-[200px] rounded-lg">
                      <FaRegEdit size={20} />
                      <p className=" text-sm">Edit Product</p>
                    </div>
                    <div className=" border flex items-center justify-center gap-3 bg-slate-100 w-[200px] h-[30px] rounded-lg">
                      <RiDeleteBin5Line size={20} />
                      <p className=" text-sm">Delete Product</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
