// src/Chessboard.js
import React, { useState } from 'react';
import { isValidRookMove, moveRook } from '../components/Piece_function/rook';
import { isValidBishopMove, moveBishop } from '../components/Piece_function/bishop';
import { isValidKnightMove, moveKnight } from '../components/Piece_function/knight';
import { isValidQueenMove, moveQueen } from '../components/Piece_function/queen';
import { isValidPawnMove, movePawn } from '../components/Piece_function/pawn';
import { isKingInCheck, isCheckmate } from '../components/Piece_function/checkmate'; // New imports for check/checkmate

const initialBoard = [
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
];

const Chessboard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPiecePosition, setSelectedPiecePosition] = useState(null);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [enPassantPosition, setEnPassantPosition] = useState(null);
  const [turn, setTurn] = useState(0); // 0 = white, 1 = black (even for white, odd for black)
 const [indicator,setIndicator]=useState("White turn");
  // Handle the start of a piece drag
  const handleDragStart = (row, col) => {
    if (board[row][col]) {
      setSelectedPiece(board[row][col]);
      setSelectedPiecePosition([row, col]);
    }
  };

  // Handle the drop event (moving a piece)
  const handleDrop = (row, col) => {
    const [fromRow, fromCol] = selectedPiecePosition;
    if (row === fromRow && col === fromCol) {
      return; // Prevent moving to the same position
    }
    if (selectedPiece) {
      const targetPiece = board[row][col];
      const isWhite = selectedPiece === '♙' || selectedPiece === '♖' || selectedPiece === '♘' || selectedPiece === '♗' || selectedPiece === '♕' || selectedPiece === '♔';
      
      // Check if it's the correct turn for the selected piece
      if ((isWhite && turn % 2 === 1) || (!isWhite && turn % 2 === 0)) {
      
        return; // Exit if the wrong player is trying to move
      }

      let isValidMove = false;

      // Determine movement logic based on the selected piece
      switch (selectedPiece) {
        case '♖': // White Rook
        case '♜': // Black Rook
          isValidMove = isValidRookMove(selectedPiecePosition, [row, col], board);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece, isWhite);
            setBoard(moveRook(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♗': // White Bishop
        case '♝': // Black Bishop
          isValidMove = isValidBishopMove(selectedPiecePosition, [row, col], board);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece, isWhite);
            setBoard(moveBishop(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♘': // White Knight
        case '♞': // Black Knight
          isValidMove = isValidKnightMove(selectedPiecePosition, [row, col]);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece, isWhite);
            setBoard(moveKnight(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♕': // White Queen
        case '♛': // Black Queen
          isValidMove = isValidQueenMove(selectedPiecePosition, [row, col], board);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece, isWhite);
            setBoard(moveQueen(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♙': // White Pawn
        case '♟': // Black Pawn
          isValidMove = isValidPawnMove(selectedPiecePosition, [row, col], board, isWhite, enPassantPosition);
   
          if (isValidMove) {
            if (targetPiece) {
              capturePiece(targetPiece, isWhite);
              setBoard(movePawn(board, selectedPiecePosition, [row, col]));
            } else if (selectedPiecePosition[0] === (isWhite ? 6 : 1) && row === (isWhite ? 4 : 3)) {
              setEnPassantPosition([row, col]); // Enable en passant
              setBoard(movePawn(board, selectedPiecePosition, [row, col]));
            } else {
              setBoard(movePawn(board, selectedPiecePosition, [row, col]));
            }
          }
          break;
        default:
       
          break;
      }
      var checkmate=false;
      // After the move, check for checkmate
      if (isValidMove) {
        const kingIsInCheck = isKingInCheck(board, !isWhite);
        if(turn===0){
 
        checkmate=isCheckmate(initialBoard, !isWhite);
        }
      else
        checkmate = isCheckmate(board, !isWhite);

        if (checkmate) {
          alert(`Checkmate! ${isWhite ? 'White' : 'Black'} wins!`);
        } else if (kingIsInCheck) {
          alert(`${!isWhite ? 'Black' : 'White'} is in check!`);
        }

        // Update the turn
        setTurn(turn + 1);
        setIndicator(!(turn%2===0)?'White turn':'Black turn')
      }

      // Reset the selected piece
      setSelectedPiece(null);
      setSelectedPiecePosition(null);
    }
  };

  // Capture a piece and add it to the captured pieces
  const capturePiece = (piece, isWhite) => {
    const pieceColor = isWhite ? 'black' : 'white';
    setCapturedPieces((prev) => ({
      ...prev,
      [pieceColor]: [...prev[pieceColor], piece],
    }));
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'grey' }}>
      <div style={{ textAlign: 'center' }}>
      <p style={{ color: 'white' }}>{indicator}</p>
        <h3 style={{ color: 'white' }}>Captured Pieces (Black): {capturedPieces.black.join(' ')}</h3>
        <h3 style={{ color: 'black' }}>Captured Pieces (White): {capturedPieces.white.join(' ')}</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 50px)', gap: '2px', margin: '20px auto' }}>
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(rowIndex, colIndex)}
              draggable={piece !== ''}
              onDragStart={() => handleDragStart(rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#fff' : '#ccc',
                fontSize: '2rem',
                cursor: piece !== '' ? 'grab' : 'default',
              }}
            >
              {piece}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chessboard;
