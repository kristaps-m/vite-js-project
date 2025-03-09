import "./App.css";
import ToDoApp from "./components/DoDoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="content">
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
