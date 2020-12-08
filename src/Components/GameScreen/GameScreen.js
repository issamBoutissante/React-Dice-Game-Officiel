import React from "react";
import "./GameScreen.css";

export default function GameScreen() {
  return (
    <section class="GameContainer">
      <section class="GameScene">
        <section class="player1 player activePlayer">
          <section class="GessedNumberArea">
            <h1>Player1</h1>
            <h1 class="total_1 number">0</h1>
          </section>
          <section class="playerPoints">
            <p>current</p>
            <h1 class="current_1">0</h1>
          </section>
        </section>
        <div class="buttons Buttons above newGame">New Game</div>
        <div class="buttons image">
          <img src="./assets/6.jpg" />
        </div>
        <div class="buttons Buttons rollDice">Roll Dice</div>
        <div class="buttons Buttons below hold">Hold</div>
        <section class="player2 player">
          <section class="GessedNumberArea">
            <h1>Player2</h1>
            <h1 class="total_2 number">0</h1>
          </section>
          <section class="playerPoints">
            <p>current</p>
            <h1 class="current_2">0</h1>
          </section>
        </section>
      </section>
    </section>
  );
}
