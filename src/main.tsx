import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "./theme/ThemeContext";
import { MemoryGameProvider } from "./components/CardMemoryGame/MemoryGameContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>
        <MemoryGameProvider>
          <App />
        </MemoryGameProvider>
      </ThemeProvider>
    </DndProvider>
  </StrictMode>
);
