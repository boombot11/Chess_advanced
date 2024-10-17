// src/Rook.js
export const isValidRookMove = (from, to, board) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
  
    // Rook movement: straight lines only
    if (fromRow === toRow || fromCol === toCol) {
        console.log(toRow+"::"+fromRow+"::"+toCol+"::"+fromCol)
      // Check if path is clear
      if (fromRow === toRow) {
        const startCol = Math.min(fromCol, toCol);
        const endCol = Math.max(fromCol, toCol);
        for (let col = startCol + 1; col < endCol; col++) {
          if (board[fromRow][col] !== '') return false;
        }
      } else {
        const startRow = Math.min(fromRow, toRow);
        const endRow = Math.max(fromRow, toRow);
        for (let row = startRow + 1; row < endRow; row++) {
          if (board[row][fromCol] !== '') return false;
        }
      }
      return true;
    }
    return false;
  };
  
  export const moveRook = (board, from, to) => {
    const newBoard = [...board];
    newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
    newBoard[from[0]][from[1]] = '';
    return newBoard;
  };
  