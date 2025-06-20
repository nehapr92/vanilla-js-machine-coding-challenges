import React, { useState } from "react";
import "./App.css";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [status, setStatus] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (board[index] !== "" || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (checkWinner(newBoard, player)) {
      setStatus(`🎉 Player ${player} wins!`);
      setGameOver(true);
    } else if (newBoard.every(cell => cell !== "")) {
      setStatus("😐 It's a draw!");
      setGameOver(true);
    } else {
      const nextPlayer = player === "X" ? "O" : "X";
      setPlayer(nextPlayer);
      setStatus(`Player ${nextPlayer}'s turn`);
    }
  };

  const checkWinner = (board, currentPlayer) => {
    return WIN_PATTERNS.some(pattern =>
      pattern.every(index => board[index] === currentPlayer)
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setPlayer("X");
    setStatus("Player X's turn");
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((val, idx) => (
          <div
            key={idx}
            className="cell"
            onClick={() => handleClick(idx)}
          >
            {val}
          </div>
        ))}
      </div>
      <p className="status">{status}</p>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}

export default App;
