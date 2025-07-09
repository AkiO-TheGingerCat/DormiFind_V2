import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-bold">Dormi</span>
        <span className="logo-light">find</span>
      </div>
      <ul className="nav-links">
        <li className={currentPath === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={currentPath === "/public-listings" ? "active" : ""}>
          <Link to="/public-listings">Listings</Link>
        </li>
        <li className={currentPath === "/reviews" ? "active" : ""}>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className={currentPath === "/about" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li className={currentPath === "/contacts" ? "active" : ""}>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
