import LoginInput from "../components/LoginInput";
// import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function onLogin({ email, password }) {
    dispatch(asyncSetAuthUser({ email, password }))
    navigate("/")
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <LoginInput login={onLogin} />
    </div>
  )
}
export default LoginPage