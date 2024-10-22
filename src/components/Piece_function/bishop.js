// src/Bishop.js
export const isValidBishopMove = (from, to, board) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
  
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
   // console.log(fromRow+"::"+toRow+"::"+fromCol+"::"+toCol+"::"+rowDiff+"::"+colDiff)
    // Check if the move is diagonal
    if (rowDiff === colDiff) {
      const rowStep = fromRow < toRow ? 1 : -1;
      const colStep = fromCol < toCol ? 1 : -1;
  
      for (let i = 1; i < rowDiff; i++) {
        if (board[fromRow + i * rowStep][fromCol + i * colStep] !== '') {
          return false; // Path is blocked
        }
      }
      return true;
    }
    return false;
  };
  
  export const moveBishop = (board, from, to) => {
    const newBoard = [...board];
    newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
    newBoard[from[0]][from[1]] = '';
    return newBoard;
  };
  