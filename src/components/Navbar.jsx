import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Fleet Logistics System</h2>

      <div className="nav-links">
        <Link to="/">Drivers</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/routes">Routes</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/route-details">Route Details</Link>
      </div>
    </nav>
  );
}

export default Navbar;
