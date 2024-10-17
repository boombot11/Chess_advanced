// src/Chessboard.js
import React, { useState } from 'react';
import {isValidRookMove, moveRook } from '../components/Piece_function/rook';
import {  isValidBishopMove, moveBishop } from '../components/Piece_function/bishop';
import {  isValidKnightMove, moveKnight } from '../components/Piece_function/knight';
import {  isValidQueenMove, moveQueen } from '../components/Piece_function/queen';
import {  isValidPawnMove, movePawn } from '../components/Piece_function/pawn';


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

  const handleDragStart = (row, col) => {
    if (board[row][col]) {
      setSelectedPiece(board[row][col]);
      setSelectedPiecePosition([row, col]);
    }
  };

  const handleDrop = (row, col) => {
    const [fromRow, fromCol] = selectedPiecePosition;
    if(row===fromRow&&col===fromCol){
    //  console.log('same drop:'+fromRow+"::"+fromCol+"::"+row+"::"+col);
      return
    }
    if (selectedPiece) {
      const targetPiece = board[row][col];
      var isWhite=false;
      if(selectedPiece==='♟'||selectedPiece==='♜'||selectedPiece==='♞'||selectedPiece==='♝'||selectedPiece==='♛'||selectedPiece==='♚')
       {
        isWhite=true;
       }
       console.log( selectedPiece+"::"+isWhite)
      let isValidMove = false;
  
      // Determine movement logic based on the selected piece
      switch (selectedPiece.toLowerCase()) {
        case '♖': // White Rook
        case '♜': // Black Rook
          isValidMove = isValidRookMove(selectedPiecePosition, [row, col], board);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece,isWhite);
            setBoard(moveRook(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♗': // White Bishop
        case '♝': // Black Bishop
          isValidMove = isValidBishopMove(selectedPiecePosition, [row, col], board);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece,isWhite);
            setBoard(moveBishop(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♞': 
        case '♘': // Knight
          isValidMove = isValidKnightMove(selectedPiecePosition, [row, col]);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece,isWhite);
            setBoard(moveKnight(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♕': // Queen
          isValidMove = isValidQueenMove(selectedPiecePosition, [row, col], board);
          if (isValidMove) {
            if (targetPiece) capturePiece(targetPiece,isWhite);
            setBoard(moveQueen(board, selectedPiecePosition, [row, col]));
          }
          break;
        case '♙': // White Pawn
        case '♟': // Black Pawn
          isValidMove = isValidPawnMove(selectedPiecePosition, [row, col], board, isWhite, enPassantPosition);
          if (isValidMove) {
            if (targetPiece) {
              capturePiece(targetPiece,isWhite);
              setBoard(movePawn(board, selectedPiecePosition, [row, col]));
            } else if (selectedPiecePosition[0] === (isWhite ? 6 : 1) && row === (isWhite ? 4 : 3)) {
              setEnPassantPosition([row, col]);
              setBoard(movePawn(board, selectedPiecePosition, [row, col]));
            } else {
              setBoard(movePawn(board, selectedPiecePosition, [row, col]));
            }
          }
          default:
            console.log(selectedPiece)
          break;
      }
  
      setSelectedPiece(null);
      setSelectedPiecePosition(null);
    }
  };
  
      

  const capturePiece = (piece,isWhite) => {
    const pieceColor = isWhite? 'black' : 'white';
    console.log("capturing::  "+isWhite+'::'+piece)
    setCapturedPieces((prev) => ({
      ...prev,
      [pieceColor]: [...prev[pieceColor], piece],
    }));
  };

  return (
    <div style={{ textAlign: 'center' ,backgroundColor:"grey"}}>
     <div style={{ textAlign: 'center' }}>
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