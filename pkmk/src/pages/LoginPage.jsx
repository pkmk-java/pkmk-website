import LoginInput from "../components/LoginInput";
// import Navbar from "../components/Navbar";

function LoginPage() {
  function onLogin({ email, password }) {
    console.log(`email:${email}, password:${password}`)
  }
  return (
    <div className="w-full h-screen bg-green-400 flex items-center justify-center">
      <LoginInput login={onLogin} />
    </div>
  )
}
export default LoginPage