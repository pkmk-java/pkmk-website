/* eslint-disable react/prop-types */

import { Outlet } from "react-router-dom";

export default function AuthComponent() {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center font-montserat">
      <h1 className=" text-2xl">Hello user</h1>
      <Outlet />
    </div>
  );
}
