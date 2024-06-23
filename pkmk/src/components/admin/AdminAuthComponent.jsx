import { Outlet } from "react-router-dom";

export default function AdminWrapperComponent() {
  return (
    <div className=" flex flex-col w-screen h-screen justify-center items-center">
      <h1 className=" font-sora">Hello admin</h1>
      <Outlet />
    </div>
  );
}
