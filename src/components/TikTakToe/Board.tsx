import { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Board.css";

export default function Board() {
  // const [board, setBoard] = useState([[<Cell />, <Cell />, <Cell />], [<Cell />, <Cell />, <Cell />], [<Cell />, <Cell />, <Cell />]]);
  // const board = [[<Cell x={0} y={0} />, <Cell x={1} y={0} />, <Cell x={2} y={0} />], [<Cell x={0} y={1} />, <Cell x={1} y={1} />, <Cell x={2} y={1} />], [<Cell x={0} y={2} />, <Cell x={1} y={2} />, <Cell x={2} y={2}  />]];
	const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const board = [];
  for (let y = 0; y < 3; y++) {
    const row = [];
    for (let x = 0; x < 3; x++) {
      row.push(<Cell x={x} y={y} setCurrentPlayer={setCurrentPlayer} currentPlayer={currentPlayer} />);
    }
    board.push(row);
  }
  // useEffect(() => {
  //   console.log("Board updated:", board);
  // }, [board]);

  return (
    <div className="board-grid">
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return cell;
          // return <div key={`${rowIndex}-${colIndex}`} className="cell">{cell}</div>;
        });
      })}
    </div>
  );
}