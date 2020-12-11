import React, {
  useState,
  useEffect,
  useContext,
  Component,
  useRef,
} from "react";
import "./GameScreen.css";
import { InfoContext } from "../InfoContext/InfoContext";
import Game from "./Game/Game";

export default function GameScreen(props) {
  const { Socket, RoomId, HosterName, FriendName } = useContext(InfoContext);
  const [finalScore, setFinalScore] = useState(15);
  const [player1] = useState(HosterName);
  const [player2] = useState(FriendName);
  const [randomNumber, setRandomNumber] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(HosterName);
  const [player1Total, setPlayer1Total] = useState(0);
  const [player2Total, setPlayer2Total] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const player1StyleRef = useRef(null);
  const player2StyleRef = useRef(null);
  //here we initialize our listeners to the server
  useEffect(() => {
    Socket.on("DiceRolled", ({ ranNum }) => {
      setRandomNumber(ranNum);
      if (ranNum === 1) {
        //Here we have to add a sound for losing score
        //and vibre the cube
        TogglePlayer();
        setPlayer1Score(0);
        setPlayer2Score(0);
      } else {
        if (currentPlayer === player1) {
          setPlayer1Score((prev) => prev + ranNum);
        } else if (currentPlayer == player2) {
          setPlayer2Score((prev) => prev + ranNum);
        }
      }
    });
    Socket.on("ScoreHolded", ({ score }) => {
      if (currentPlayer === player1) {
        setPlayer1Total((prev) => prev + score);
      } else {
        setPlayer2Total((prev) => prev + score);
      }
      TogglePlayer();
      setPlayer1Score(0);
      setPlayer2Score(0);
    });
  }, []);
  //this player will toggle players and their style
  const TogglePlayer = () => {
    if (currentPlayer === player1) {
      setCurrentPlayer(player2);
      player2StyleRef.current.classList.add("activePlayer");
      player1StyleRef.current.classList.remove("activePlayer");
    } else if (currentPlayer == player2) {
      setCurrentPlayer(player1);
      player1StyleRef.current.classList.add("activePlayer");
      player2StyleRef.current.classList.remove("activePlayer");
    }
  };
  const onRollDiceHandler = () => {
    Socket.emit("RollDice", { roomId: RoomId });
  };
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
  const onHoldHandler = () => {
    currentPlayer == player1
      ? Socket.emit("Hold", { score: player1Score })
      : Socket.emit("Hold", { score: player2Score });
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
      player1StyleRef={player1StyleRef}
      player2StyleRef={player2StyleRef}
    ></Game>
  );
}
