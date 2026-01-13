import { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { GetGameResult } from "./GetGameResult";

export default function Board() {
  const [board, setBoard] = useState<(null | "X" | "O")[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  useEffect(() => {
    const gameResult = GetGameResult(board);
    if (gameResult === "X" || gameResult === "O") {
      alert(`Player ${gameResult} wins!`);
    } else if (gameResult === "Draw") {
      alert("It's a draw!");
    }
    // console.log("Board updated:", board);
  }, [board]);

  return (
    <>
      <h1>Next: {currentPlayer}</h1>

      <div className="board-grid">
        {board.map((row, rowIndex) => {
          return row.map((_, colIndex) => {
            return <Cell 
                      x={colIndex}
                      y={rowIndex}
                      currentPlayer={currentPlayer}
                      setCurrentPlayer={setCurrentPlayer}
                      setBoard={setBoard}
                      theGameResult={GetGameResult(board)}
                      key={`${colIndex}-${rowIndex}`}
                    />;
          });
        })}
      </div>    
    </>
  );
}