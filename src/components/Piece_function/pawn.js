// src/Pawn.js
export const isValidPawnMove = (from, to, board, isWhite, isEnPassant = false, enPassantPosition = null) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
  
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
  console.log(fromRow+"::"+toRow+"::"+fromCol+"::"+toCol+"::"+direction)
    // Normal move
    if (toCol === fromCol) {
      if (board[toRow][toCol] === '' && toRow === fromRow + direction) {
        return true; // Move one square forward
      }
      if (toRow === fromRow + direction * 2 && fromRow === startRow && board[toRow][toCol] === '' && board[fromRow + direction][fromCol] === '') {
        return true; // Move two squares forward
      }
    } else if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
      // Capture move
      if (board[toRow][toCol] !== '') {
        return true; // Capture piece
      }
    }
  
    // En passant
    if (isEnPassant && enPassantPosition && toRow === enPassantPosition[0] && toCol === enPassantPosition[1]) {
        return true; // Capture en passant
    }
    console.log('false;')
    return false;
  };
  
  export const movePawn = (board, from, to) => {
    const newBoard = [...board];
    newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
    newBoard[from[0]][from[1]] = '';
    return newBoard;
  };
  