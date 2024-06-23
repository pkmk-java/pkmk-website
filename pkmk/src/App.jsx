import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className=" h-screen w-full">
      <h1>Hello world</h1>
      <Link to={"/login"}>Login</Link>
      <Outlet />
    </div>
  );
}
