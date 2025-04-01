import "../App.css";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";

function Navbar() {
  const { toggleTheme } = useTheme();

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
          <Link to="/CardMemoryGame">Card Memory Game</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
      </ul>

      <button style={{ position: "absolute", right: 0, marginRight: "2rem" }} onClick={toggleTheme}>
        Toggle Theme
      </button>
    </nav>
  );
}

export default Navbar;
