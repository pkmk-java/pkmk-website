import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formHandler } from "../../utils/formHandler";
// eslint-disable-next-line no-unused-vars, react/prop-types
function AdminRegisterComponent({ register }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const data = {
    username: username,
    email: email,
    password: password,
  };
  console.log(data);

  function resetField() {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  const registerHandler = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/pkmk-javac/user/register",
        data
      );
      const result = await response.data;
      console.log(result);
      resetField();
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.msg);
      setIsError(true);
      setErrorMsg(error.response.data.msg);
      resetField();
    }
  };

  return (
    <form className="w-96 bg-white px-8 py-12 rounded">
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-2">
          Username
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={username}
          onChange={(e) => formHandler("username", e.target.value, setUsername)}
          id="username"
          name="username"
          className="rounded block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-4"
        />

        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="text"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => formHandler("email", e.target.value, setEmail)}
          name="email"
          id="email"
          className="rounded block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-2"
        />

        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => formHandler("password", e.target.value, setPassword)}
          id="password"
          name="password"
          className="rounded block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-4"
        />
        {isError ? (
          <div className=" text-red-600 pb-3">
            {" "}
            <p>*{errorMsg}</p>
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={registerHandler}
        className="mb-4 w-full rounded-md bg-green-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600"
      >
        Register
      </button>
      <p>
        Sudah punya akun?{" "}
        <Link to="/auth/login" className="text-green-600">
          Masuk
        </Link>
      </p>
    </form>
  );
}
export default AdminRegisterComponent;
