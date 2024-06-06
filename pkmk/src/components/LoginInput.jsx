import useInput from "../hooks/useInput"
import { Link } from "react-router-dom"
// eslint-disable-next-line no-unused-vars, react/prop-types
function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("")
  const [password, onPasswordChange] = useInput("")
  return (
    <form className="w-96 bg-white px-8 py-12 rounded">
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2">Email</label>
        <input type="text" placeholder="example@gmail.com" value={email} onChange={onEmailChange} name="email" id="email" className="rounded block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-2" />
        <label htmlFor="password" className="mb-2">Password</label>
        <input type="password" placeholder="******" required value={password} onChange={onPasswordChange} id="password" name="password" className="rounded block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-4" />
      </div>
      <button type="button" onClick={() => login({ email, password })} className="mb-4 w-full rounded-md bg-green-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600">Login</button>
      <p>Belum punya akun? <Link to="/register" className="text-green-600">Buat akun</Link></p>
    </form>
  )
}
export default LoginInput