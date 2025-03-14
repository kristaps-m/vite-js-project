import "../App.scss";
import { Link } from "react-router-dom";
import "../styles/theme-variables.scss";
import Header from "./header";

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
        <li>
          <Header />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
