import "./App.scss";
import ToDoApp from "./components/DoDoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./contexts/theme-context";
import { useState } from "react";

function App() {
  // const isBrowserDefaultDark = () =>
  //   window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Detecting the default theme
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const getDefaultTheme = (): string => {
  //   const localStorageTheme = localStorage.getItem("default-theme");
  //   const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
  //   return localStorageTheme || browserDefault;
  // };
  const [theme, setTheme] = useState(isBrowserDefaultDark() ? "dark" : "light");
  // const [theme, setTheme] = useState(getDefaultTheme());

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <Router>
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ToDoApp" element={<ToDoApp />} />
              </Routes>
            </div>
          </Router>
          {/* <Layout>
       // Your code here
    </Layout> */}
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
