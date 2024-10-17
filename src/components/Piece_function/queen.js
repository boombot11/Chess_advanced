// src/Queen.js
import { isValidBishopMove } from "./bishop";
import { isValidRookMove } from "./rook";

export const isValidQueenMove = (from, to, board) => {
  return isValidRookMove(from, to, board) || isValidBishopMove(from, to, board);
};

export const moveQueen = (board, from, to) => {
  const newBoard = [...board];
  newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
  newBoard[from[0]][from[1]] = '';
  return newBoard;
};
