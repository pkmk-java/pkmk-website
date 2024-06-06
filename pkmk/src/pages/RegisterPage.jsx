import RegisterInput from "../components/RegisterInput"
import { useDispatch } from "react-redux"
import { asyncRegisterUser } from "../states/users/action"
function RegisterPage() {
  const dispatch = useDispatch()
  function onRegister({ username, email, password }) {
    dispatch(asyncRegisterUser({ username, email, password }))
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <RegisterInput register={onRegister} />
    </div>
  )
}
export default RegisterPage