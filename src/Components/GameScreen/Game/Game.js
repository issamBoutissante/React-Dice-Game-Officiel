import React, { useEffect } from "react";
const Game = ({
  player1,
  player2,
  player1Score,
  player2Score,
  player1Total,
  player2Total,
  onRollDiceHandler,
  onHoldHandler,
  randomNumber,
  player1StyleRef,
  player2StyleRef,
}) => {
  return (
    <section className="GameContainer">
      <section className="GameScene">
        <section ref={player1StyleRef} className="player1 player activePlayer">
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
        <section ref={player2StyleRef} className="player2 player">
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
};
export default Game;
