export function GetGameResult(board: (null | "X" | "O")[][]): null | "X" | "O" | "Draw" {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
      return board[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== null) {
      return board[0][j];
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
    return board[0][0];
  }
  
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
    return board[0][2];
  }

  // Check for draw
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) break;
  }

  if (isDraw) return "Draw";

  return null;
}