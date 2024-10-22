import { isValidRookMove } from './rook';
import { isValidBishopMove } from './bishop';
import { isValidKnightMove } from './knight';
import { isValidQueenMove } from './queen';
import { isValidPawnMove } from './pawn';
import { getKingMoves, getBishopMoves, getKnightMoves, getPawnMoves, getQueenMoves, getRookMoves } from './getMovies'; // Assuming getMoves is properly implemented

// Helper function to find the position of a player's king
export const findKing = (board, isWhite) => {
  const kingSymbol = isWhite ? '♔' : '♚';
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === kingSymbol) {
        return [row, col]; // Return the king's position
      }
    }
  }
  return null; // King not found (should never happen in a valid game)
};

// Check if the king is in check
export const isKingInCheck = (board, isWhite) => {
  const kingPosition = findKing(board, isWhite);
  if (!kingPosition) return false; // King not found, invalid game state

  // Check for opponent's pieces that could attack the king
  const opponentPieces = isWhite
    ? ['♟', '♜', '♞', '♝', '♛', '♚'] // Black pieces
    : ['♙', '♖', '♘', '♗', '♕', '♔']; // White pieces

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const piece = board[row][col];
      if (opponentPieces.includes(piece)) {
        // Check if the opponent's piece can move to the king's position
        switch (piece) {
          case '♜': case '♖':
            if (isValidRookMove([row, col], kingPosition, board)) return true;
            break;
          case '♝': case '♗':
            if (isValidBishopMove([row, col], kingPosition, board)) return true;
            break;
          case '♞': case '♘':
            if (isValidKnightMove([row, col], kingPosition)) return true;
            break;
          case '♛': case '♕':
            if (isValidQueenMove([row, col], kingPosition, board)) return true;
            break;
          case '♟':
            if (isValidPawnMove([row, col], kingPosition, board, false)) return true;
            break;
          case '♙':
            if (isValidPawnMove([row, col], kingPosition, board, true)) return true;
            break;
          default:
            break;
        }
      }
    }
  }
  return false; // No threats found
};

// Check if the player is in checkmate
export const isCheckmate = (board, isWhite) => {
  // Step 1: Check if the king is in check
  if (!isKingInCheck(board, isWhite)) {
    return false; // If the king isn't in check, it's not checkmate
  }

  // Step 2: Find all player's pieces and check if any valid move can get the king out of check
  const playerPieces = isWhite
    ? ['♙', '♖', '♘', '♗', '♕', '♔'] // White pieces
    : ['♟', '♜', '♞', '♝', '♛', '♚']; // Black pieces

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const piece = board[row][col];
      if (playerPieces.includes(piece)) {
        // Step 3: Get all possible moves for this piece
        const possibleMoves = getPossibleMoves(piece, [row, col], board, isWhite);
        for (const move of possibleMoves) {
          const [newRow, newCol] = move;
          // Step 4: Simulate the move and check if the king is still in check
          const newBoard = simulateMove(board, [row, col], [newRow, newCol]);
          if (!isKingInCheck(newBoard, isWhite)) {
            return false; // Found a move that avoids check, so it's not checkmate
          }
        }
      }
    }
  }

  return true; // No valid moves that prevent check, so it's checkmate
};

// Get all possible valid moves for a given piece
const getPossibleMoves = (piece, position, board, isWhite) => {
  const [row, col] = position;
  let validMoves = [];

  // Determine valid moves based on piece type
  switch (piece) {
    case '♖': case '♜':
      validMoves = getRookMoves([row, col], board);
      break;
    case '♗': case '♝':
      validMoves = getBishopMoves([row, col], board);
      break;
    case '♘': case '♞':
      validMoves = getKnightMoves([row, col], board);
      break;
    case '♕': case '♛':
      validMoves = getQueenMoves([row, col], board);
      break;
    case '♙': case '♟':
      validMoves = getPawnMoves([row, col], board, isWhite);
      break;
    case '♔': case '♚':
      validMoves = getKingMoves([row, col], board, isWhite);
      break;
    default:
      break;
  }

  return validMoves;
};

// Simulate a move by creating a new board with the piece moved
const simulateMove = (board, fromPosition, toPosition) => {
  const [fromRow, fromCol] = fromPosition;
  const [toRow, toCol] = toPosition;

  // Create a copy of the board
  const newBoard = board.map(row => [...row]);

  // Move the piece
  newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  newBoard[fromRow][fromCol] = ''; // Clear the old position

  return newBoard;
};
