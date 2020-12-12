import React, { useState, useEffect, useContext, useRef } from "react";
import "./GameScreen.css";
import { InfoContext } from "../InfoContext/InfoContext";
import Game from "./Game/Game";

export default function GameScreen(props) {
  console.log("rendered again");
  const { Socket, RoomId, HosterName, FriendName } = useContext(InfoContext);
  const [finalScore, setFinalScore] = useState(15);
  const [player1] = useState(HosterName);
  const [player2] = useState(FriendName);
  const [randomNumber, setRandomNumber] = useState(0);
  //const currentPlayer = useRef(HosterName);
  const [currentPlayer, setCurrentPlayer] = useState(HosterName);
  const [player1Total, setPlayer1Total] = useState(0);
  const [player2Total, setPlayer2Total] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const player1StyleRef = useRef(null);
  const player2StyleRef = useRef(null);
  useEffect(() => {
    console.log(currentPlayer);
  });
  //here we initialize our listeners to the server
  useEffect(() => {}, []);
  //this player will toggle players and their style

  const CheckWinner = (winner) => {
    if (player1Total >= finalScore) {
      player1StyleRef.current.classList.add("winer");
    } else if (player2Total >= finalScore) {
      player2StyleRef.current.classList.add("winer");
    }
  };

  useEffect(() => {
    CheckWinner();
  }, [player1Total, player2Total]);

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
      player1StyleRef={player1StyleRef}
      player2StyleRef={player2StyleRef}
    ></Game>
  );
}
