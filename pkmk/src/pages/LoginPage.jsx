import LoginInput from "../components/LoginInput";
// import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
function LoginPage() {
  const dispatch = useDispatch()
  function onLogin({ email, password }) {
    dispatch(asyncSetAuthUser({ email, password }))
    console.log(email, password)
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <LoginInput login={onLogin} />
    </div>
  )
}
export default LoginPage