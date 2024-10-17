// src/Knight.js
export const isValidKnightMove = (from, to) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
  
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
  console.log('bishop:'+(rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2));
    // Check if the move is an L shape
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };
  
  export const moveKnight = (board, from, to) => {
    const newBoard = [...board];
    newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
    newBoard[from[0]][from[1]] = '';
    return newBoard;
  };
  