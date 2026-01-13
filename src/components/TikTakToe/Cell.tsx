import { useEffect, useState } from "react";

interface CellProps {
	x: number;
	y: number;
	currentPlayer: "X" | "O";
	setCurrentPlayer: React.Dispatch<React.SetStateAction<"X" | "O">>;
}

export default function Cell({x: a, y: b, currentPlayer, setCurrentPlayer}: CellProps) {
	const [cell, setCell] = useState<"X" | "O" | null>(null);
	// const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
	// console.log(cell);
	const handleClick = () => {
		console.log(currentPlayer);
		if (cell === null) {
			setCell(currentPlayer);
		}
		//  else if (cell === "X") {
		// 	setCell("O");
		// } else {
		// 	setCell(null);
		// }

		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
		// console.log(cell);
	};

	// useEffect(() => {
	// 	console.log("Cell updated:", cell);
	// }, [cell]);

  // return (<h1 onClick={() =>setCell("X")}>{cell}</h1>);
  return (<div className="cell"onClick={handleClick} key={`${a}-${b}`}>{cell}</div>);
}
