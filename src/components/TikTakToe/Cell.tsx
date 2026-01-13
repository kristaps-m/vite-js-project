import { useState } from "react";

interface CellProps {
	x: number;
	y: number;
	currentPlayer: "X" | "O";
	setCurrentPlayer: React.Dispatch<React.SetStateAction<"X" | "O">>;
	setBoard: React.Dispatch<React.SetStateAction<(null | "X" | "O")[][]>>;
	theGameResult?: null | "X" | "O" | "Draw";
}

export default function Cell({x: a, y: b, currentPlayer, setCurrentPlayer, setBoard, theGameResult}: CellProps) {
	const [cell, setCell] = useState<"X" | "O" | null>(null);
	const handleClick = () => {
		if (theGameResult !== null) return;
		if (cell === null) {
			setCell(currentPlayer);
		}

		setBoard(prevBoard => {
			const newBoard = prevBoard.map(row => row.slice());
			// const newBoard = [...prevBoard]; // AI tip: This only creates a shallow copy (not sufficient for 2D array) // 
			newBoard[b][a] = currentPlayer;
			return newBoard;
		});

		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
	};

  return (<div className="cell"onClick={handleClick}>{cell}</div>);
}
