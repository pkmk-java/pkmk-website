/* eslint-disable react/prop-types */

import { Outlet } from "react-router-dom";

export default function AuthComponent() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}
