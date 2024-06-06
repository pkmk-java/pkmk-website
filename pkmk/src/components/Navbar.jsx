import { Link } from "react-router-dom"
function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-green-600 py-3 px-3 fixed top-0 right-0 left-0">
      <h1>Logo</h1>
      <ul className="flex items-center justify-center gap-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

    </nav>
  )
}
export default Navbar