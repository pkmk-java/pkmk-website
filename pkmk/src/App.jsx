import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className=" h-screen w-full font-sora bg-black text-white flex flex-col gap-3 items-center justify-center">
      <h1 className=" text-3xl">Welcome to PKMK JAVABROWN website</h1>
      <p className=" text-sm">
        are you user?{" "}
        <Link className=" underline underline-offset-2" to={"/auth/login"}>
          Login here
        </Link>
      </p>
      <div className=" absolute bottom-5">
        <div>
          <p className=" text-sm">
            admin ? <Link to={"/admin/login"}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
