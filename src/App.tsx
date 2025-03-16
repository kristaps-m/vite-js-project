import "./App.css";
import ToDoApp from "./components/DoDoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useTheme } from "./theme/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Router>
        <Navbar />
        <div className={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ToDoApp" element={<ToDoApp />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
