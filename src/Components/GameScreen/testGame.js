import React, { useState, useEffect, useContext, Component } from "react";
import "./GameScreen.css";
import { InfoContext } from "../InfoContext/InfoContext";
import Game from "./Game/Game";

export default function GameScreen(props) {
  const { Socket, RoomId, HosterName, FriendName } = useContext(InfoContext);
  const [player1, setPlayer1] = useState("issam");
  const [player2, setPlayer2] = useState("chaimae");
  const [randomNumber, setRandomNumber] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("issam");
  const [player1Total, setPlayer1Total] = useState(0);
  const [player2Total, setPlayer2Total] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  useEffect(() => {}, []);
  console.log("==========================");
  console.log(`currentPlayer=${currentPlayer}`);
  console.log(`player1Score=${player1Score}`);
  console.log(`player2Score=${player2Score}`);
  console.log(`player1Total=${player1Total}`);
  console.log(`player2Total=${player2Total}`);
  console.log("==========================");

  const onRollDiceHandler = () => {
    setRandomNumber(Math.ceil(Math.random() * 6));
    if (randomNumber === 1) {
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
      setPlayer2Score(0);
      setPlayer1Score(0);
      setRandomNumber(0);
    } else {
      currentPlayer == player1
        ? setPlayer1Score(player1Score + randomNumber)
        : setPlayer2Score(player2Score + randomNumber);
    }
  };
  const onHoldHandler = () => {
    currentPlayer === player1
      ? setPlayer1Total(player1Total + player1Score)
      : setPlayer2Total(player1Total + player2Score);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRandomNumber(0);
  };

  return (
    <Game
      player1={player1}
      player2={player2}
      player1Score={player1Score}
      player2Score={player2Score}
      player1Total={player1Total}
      player2Total={player2Total}
      randomNumber={randomNumber}
      onRollDiceHandler={onRollDiceHandler}
      onHoldHandler={onHoldHandler}
    ></Game>
  );
}
