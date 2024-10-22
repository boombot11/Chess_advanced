// Helper function to check if a position is within bounds of the board
const isWithinBounds = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

// Helper function to check if the target square is empty or contains an opponent's piece
const isValidTarget = (board, row, col, isWhite) => {
  const target = board[row][col];
  if (target === '') return true; // Empty square is a valid move
  const opponentPieces = isWhite
    ? ['♟', '♜', '♞', '♝', '♛', '♚']
    : ['♙', '♖', '♘', '♗', '♕', '♔'];
  return opponentPieces.includes(target); // Opponent's piece is a valid capture
};

export const getKnightMoves = ([row, col], board) => {
    const moves = [];
    const knightMoves = [
      [row - 2, col - 1], [row - 2, col + 1],
      [row - 1, col - 2], [row - 1, col + 2],
      [row + 1, col - 2], [row + 1, col + 2],
      [row + 2, col - 1], [row + 2, col + 1],
    ];

    knightMoves.forEach(([r, c]) => {
  
      if (isWithinBounds(r, c)) { // Check bounds before accessing board[r][c]
        const isWhite = board[row][col] === '♘' || board[row][col] === '♖';
        if (isValidTarget(board, r, c, isWhite)) {
          moves.push([r, c]);
        }
      }
    });
  
    return moves;
  };
  
// Function to get all valid moves for a rook
export const getRookMoves = ([row, col], board) => {
  const moves = [];
  var blocked=false;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  directions.forEach(([dr, dc]) => {
    let r = row + dr;
    let c = col + dc;
    if( isWithinBounds(r, c) &&board[r][c] !== ''){
        blocked=true;
    }
    while (isWithinBounds(r, c) && !blocked) {
      moves.push([r, c]);
      r += dr;
      c += dc;
    }
    if (isWithinBounds(r, c) && isValidTarget(board, r, c, board[row][col] === '♖')) {
      moves.push([r, c]); // Capture opponent's piece
    }
  });

  return moves;
};

// Function to get all valid moves for a bishop
export const getBishopMoves = ([row, col], board) => {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
 var blocked=false;
  directions.forEach(([dr, dc]) => {
    let r = row + dr;
    let c = col + dc;
    if(isWithinBounds(r, c) && board[r][c] !== ''){
        blocked=true;
    }
    while (isWithinBounds(r, c)  && !blocked) {
      moves.push([r, c]);
      r += dr;
      c += dc;
    }
    if (isWithinBounds(r, c) && isValidTarget(board, r, c, board[row][col] === '♗')) {
      moves.push([r, c]); // Capture opponent's piece
    }
  });

  return moves;
};

// Function to get all valid moves for a queen
export const getQueenMoves = ([row, col], board) => {
  // Queen combines rook and bishop moves
  const rookMoves = getRookMoves([row, col], board);
  const bishopMoves = getBishopMoves([row, col], board);
  return [...rookMoves, ...bishopMoves];
};

// Function to get all valid moves for a pawn
export const getPawnMoves = ([row, col], board, isWhite) => {
  const moves = [];
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const enemyPieces = isWhite
    ? ['♟', '♜', '♞', '♝', '♛', '♚'] // Black pieces
    : ['♙', '♖', '♘', '♗', '♕', '♔']; // White pieces
 var blocked=false;
  // Move forward one square
  if( isWithinBounds(row + direction, col) && board[row + direction][col] !== ''){
    blocked=true;
}
if( row === startRow && board[row + 2 * direction][col] === ''){
    blocked=true;
}
  if (isWithinBounds(row + direction, col) && board[row + direction][col] === ''&& !blocked) {
    moves.push([row + direction, col]);

    // Move forward two squares from starting position
    if (row === startRow && board[row + 2 * direction][col] === '') {
      moves.push([row + 2 * direction, col]);
    }
  }

  // Capture diagonally
  if (isWithinBounds(row + direction, col - 1) && enemyPieces.includes(board[row + direction][col - 1])) {
    moves.push([row + direction, col - 1]);
  }
  if (isWithinBounds(row + direction, col + 1) && enemyPieces.includes(board[row + direction][col + 1])) {
    moves.push([row + direction, col + 1]);
  }

  return moves;
};

// Function to get all valid moves for a king
export const getKingMoves = ([row, col], board) => {
  const moves = [];
  const kingMoves = [
    [row - 1, col], [row + 1, col],
    [row, col - 1], [row, col + 1],
    [row - 1, col - 1], [row - 1, col + 1],
    [row + 1, col - 1], [row + 1, col + 1],
  ];

  kingMoves.forEach(([r, c]) => {
    if (isWithinBounds(r, c)) {
      if (isValidTarget(board, r, c, board[row][col] === '♔')) {
        moves.push([r, c]);
      }
    }
  });

  return moves;
};
