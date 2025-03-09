import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-bar-buttons">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ToDoApp">To-Do App</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
