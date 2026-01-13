import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState([[<Cell />, <Cell />, <Cell />], [<Cell />, <Cell />, <Cell />], [<Cell />, <Cell />, <Cell />]]);

  return (
    <div className="board-grid">
      {board.map((row) => {
        return row.map((cell, colIndex) => {
          return <div key={colIndex} className="cell">{cell}</div>;
        });
      })}
    </div>
  );
}