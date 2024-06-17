import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { unsetAuthUser } from "../states/authUser/action"
function Navbar() {
  const authUser = useSelector(state => state.authUser)
  const dispatch = useDispatch()

  function onSignOut() {
    dispatch(unsetAuthUser())
  }
  return (
    <nav className="w-full flex items-center justify-between bg-[#ECB176] py-3 px-3 fixed top-0 right-0 left-0">
      <h1>Logo</h1>
      <ul className="flex items-center justify-center gap-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {authUser?.isAdmin &&
          (<li>
            <Link to="/dashboard">Dashboard</Link>
          </li>)}
      </ul>
      <ul>
        {authUser !== null ? (
          <button type="button" onClick={() => onSignOut()}>sign Out</button>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

    </nav>
  )
}
export default Navbar