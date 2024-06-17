import LoginInput from "../components/LoginInput";
import { useDispatch } from "react-redux";
import { asyncSetAuthAdmin } from "../states/authUser/action";
import { useNavigate } from "react-router-dom";
function LoginPageAdmin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function onLogin({ email, password }) {
    dispatch(asyncSetAuthAdmin({ email, password }))
    navigate("/")
    console.log(email, password)
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <LoginInput login={onLogin} />
    </div>
  )
}
export default LoginPageAdmin