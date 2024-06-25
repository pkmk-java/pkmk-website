import { useState } from "react";
import { formHandler } from "../../utils/formHandler";
import axios from "axios";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

export default function ProductHandlerComponent() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const token = Cookies.get("adminToken");
  const data = new FormData();
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  data.append("productName", productName);
  data.append("description", description);
  data.append("price", price);
  data.append("stock", stock);
  data.append("image", image);
  const dataForm = Object.fromEntries(data);
  console.log(dataForm);

  function resetField() {
    setProductName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setImage(null);
  }

  const createProduct = async () => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.postForm(
        "http://localhost:3000/api/pkmk-javac/admin/create-product",
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      resetField();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(true);
      setErrMsg(error.response.data.msg);
      setLoading(false);
    }
  };
  return (
    <div className=" basis-11/12 pt-10 h-full w-[800px] flex flex-col font-raleway">
      <div className=" basis-1/12 flex flex-col justify-center">
        <h1 className=" text-xl font-extrabold">Create New Product</h1>
      </div>
      <div className=" basis-8/12 max-w-[600px] flex flex-col justify-start">
        <form
          className=" flex flex-col gap-3 border h-[650px] border-slate-300 p-5 rounded-xl"
          action=""
        >
          <div className=" flex flex-col gap-2">
            <label className=" pl-1" htmlFor="">
              Product Name :
            </label>
            <input
              className=" h-[40px] placeholder:text-sm pl-3 focus:outline-none rounded-xl"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) =>
                formHandler("productName", e.target.value, setProductName)
              }
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" pl-1" htmlFor="">
              Description :
            </label>
            <input
              className=" h-[40px] placeholder:text-sm pl-3 focus:outline-none rounded-xl"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                formHandler("description", e.target.value, setDescription)
              }
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" pl-1" htmlFor="">
              Price :
            </label>
            <input
              className=" h-[40px] placeholder:text-sm pl-3 focus:outline-none rounded-xl"
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => formHandler("price", e.target.value, setPrice)}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" pl-1" htmlFor="">
              Stock :
            </label>
            <input
              className=" h-[40px] placeholder:text-sm pl-3 focus:outline-none rounded-xl"
              type="text"
              placeholder="Stock"
              value={stock}
              onChange={(e) => formHandler("stock", e.target.value, setStock)}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" pl-1" htmlFor="">
              Image :
            </label>
            <input
              className=" h-[40px]"
              type="file"
              placeholder="Stock"
              onChange={(e) =>
                formHandler("image", e.target.files[0], setImage)
              }
            />
          </div>
          {err ? (
            <div>
              <p className=" text-red-600 text-sm">* {errMsg}</p>
            </div>
          ) : null}
          <div className=" bg-blue-600 text-white h-[40px] w-[150px] flex items-center justify-center rounded-lg">
            <button
              className=" flex items-center justify-center"
              onClick={createProduct}
            >
              {loading ? (
                <BeatLoader color="white" size={8} />
              ) : (
                "create product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
