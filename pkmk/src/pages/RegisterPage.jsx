import RegisterInput from "../components/RegisterInput"


function RegisterPage() {
  function onRegister({ username, email, password }) {
    console.log(`username:${username}, email:${email}, password:${password}`)
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <RegisterInput register={onRegister} />
    </div>
  )
}
export default RegisterPage