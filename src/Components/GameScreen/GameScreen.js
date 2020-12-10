import React, { useState, useEffect, useContext } from "react";
import "./GameScreen.css";
import querystring from "querystring";
import Context from "../ContexApi/ContexApi";

export default function GameScreen(props) {
  const { Socket, RoomId } = useContext(Context);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [player1Total, setPlayer1Total] = useState(0);
  const [player2Total, setPlayer2Total] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  //this function will be called each time a player ckick dice
  useEffect(() => {
    const params = querystring.parse(props.location.search);
    setPlayer1(params["hosterName"]);
    setPlayer2(params["?friendName"]);
    //Socket.on("DiceRolled", ({ ranNum }) => {
    //   setRandomNumber(ranNum);
    //   if (randomNumber === 1) {
    //     changePlayer();
    //     setPlayer2Score(0);
    //     setPlayer1Score(0);
    //   } else {
    //     addToScore(currentPlayer, randomNumber);
    //   }
    // });
  });
  const changePlayer = () => {
    setCurrentPlayer((current) =>
      player1 == current ? setCurrentPlayer(player2) : setCurrentPlayer(player1)
    );
  };
  const addToScore = (current, number) => {
    if (current === player1) {
      setPlayer1Score((currentNumber) => currentNumber + number);
    } else {
      setPlayer2Score((currentNumber) => currentNumber + number);
    }
  };
  const onRollDiceHandler = () => {
    setRandomNumber(Math.ceil(Math.random() * 6));
    //Socket.emit("RollDice", { roomId: RoomId });
  };
  const onHoldHandler = () => {
    if (currentPlayer == player1) {
      setPlayer1Total((current) => current + player1Score);
    } else {
      setPlayer2Total((current) => current + player2Score);
    }
    setPlayer1Score(0);
    setPlayer2Score(0);
    changePlayer();
  };
  return (
    <section className="GameContainer">
      <Context.Consumer>
        {(cont) => {
          console.log("from Game Screen" + cont.Socket);
        }}
      </Context.Consumer>
      <section className="GameScene">
        <section className="player1 player activePlayer">
          <section className="GessedNumberArea">
            <h1>{player1}</h1>
            <h1 className="total_1 number">{player1Total}</h1>
          </section>
          <section className="playerPoints">
            <p>current</p>
            <h1 className="current_1">{player1Score}</h1>
          </section>
        </section>
        <div className="buttons Buttons above newGame">New Game</div>
        <div className="buttons image">{randomNumber}</div>
        <div className="buttons Buttons rollDice" onClick={onRollDiceHandler}>
          Roll Dice
        </div>
        <div className="buttons Buttons below hold" onClick={onHoldHandler}>
          Hold
        </div>
        <section className="player2 player">
          <section className="GessedNumberArea">
            <h1>{player2}</h1>
            <h1 className="total_2 number">{player2Total}</h1>
          </section>
          <section className="playerPoints">
            <p>current</p>
            <h1 className="current_2">{player2Score}</h1>
          </section>
        </section>
      </section>
    </section>
  );
}
