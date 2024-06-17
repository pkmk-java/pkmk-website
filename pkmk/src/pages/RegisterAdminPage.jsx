import { useDispatch } from "react-redux"
import { asyncRegisterAdmin } from "../states/users/action"
import RegisterInput from "../components/RegisterInput"
function RegisterPageAdmin() {
  const dispatch = useDispatch()
  function onRegister({ username, email, password }) {
    dispatch(asyncRegisterAdmin({ username, email, password }))
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <RegisterInput register={onRegister} />
    </div>
  )
}
export default RegisterPageAdmin