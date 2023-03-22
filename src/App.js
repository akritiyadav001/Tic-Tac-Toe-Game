import './App.css';
import { useState, useEffect } from 'react';
import Square from './Components/square';
import { Patterns } from './Components/patterns';
import React from "react";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setplayer] = useState("0");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  // This will check that winner and tie of the game
  useEffect(() => {
    checkWins();
    checkTie();
    if (player === "X") {
      setplayer("0");
    }
    else {
      setplayer("X");
    }

  }, [board]);

  // This will alert after the game is finished and announce the winner.
  useEffect(() => {
    if (result.winner !== "none") {
      alert(`Game finished! Winning Player ${result.winner}`);
      restartGame();
    }
  }, [result])

  // It  will fill the player name inside the square when the player will click on it
  const chooseSquare = (squarenumber) => {
    setBoard(board.map((val, index) => {
      if (squarenumber === index && val === "") {
        return player;
      }
      return val;
    }));

  }

  // This will check who is the winner of the game by mathcing the winning patterns position full filled by same player or not
  const checkWins = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") return;
      let foundWinPattern = true;
      currentPattern.forEach((index) => {
        if (board[index] !== firstPlayer)
          foundWinPattern = false;
      })

      if (foundWinPattern) {
        setResult({ winner: player, state: "won" })
      }

    })
  }

  // This will check game is tie 
  const checkTie = () => {
    let filled = true;
    board.forEach((Square) => {
      if (Square === "") {
        filled = false;
      }
    })
    if (filled) {
      setResult({ winner: "No one", state: "It's a tie." })
    }
  }

  // For restarting the game
  const restartGame = () => {
    setBoard(["","","","","","","","",""]);
    setplayer("0");
  }
  return (
    <>
    <h1>Tic! Tac! Toe!</h1>
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
