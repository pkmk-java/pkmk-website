import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-[#ECB176] h-[100px] pl-8 pr-8">
      <div className=" h-[150px] w-auto">
        <img className=" w-full h-full object-" src="/logo.png" />
      </div>
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
      </ul>
      <ul>
        <li>
          <Link to="/login">Log out</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
