import "./App.css";
import ToDoApp from "./components/ToDoApp/DoDoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useTheme } from "./theme/ThemeContext";
import CardMemoryGame from "./components/CardMemoryGame/CardMemoryGame";
import About from "./components/About";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Router>
        <Navbar />
        <div className={`content ${theme}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ToDoApp" element={<ToDoApp />} />
            <Route path="/CardMemoryGame" element={<CardMemoryGame />}></Route>
            <Route path="/About" element={<About />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
