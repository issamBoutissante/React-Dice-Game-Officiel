import React, { useRef } from "react";
import "./GameDice.css";

const Dice = ({ onRollDiceHandler, CubeRef }) => {
  return (
    <div class="cubeContainer">
      <div id="GameCube" ref={CubeRef} onClick={onRollDiceHandler}>
        <div class="GameSide GameFace1">
          <div class="GameDot1 GameDot"></div>
        </div>
        <div class="GameSide GameFace2">
          <div class="GameDot1 GameDot"></div>
          <div class="GameDot2 GameDot"></div>
        </div>
        <div class="GameSide GameFace3">
          <div class="GameDot1 GameDot"></div>
          <div class="GameDot2 GameDot"></div>
          <div class="GameDot3 GameDot"></div>
        </div>
        <div class="GameSide GameFace4">
          <div class="GameDot1 GameDot"></div>
          <div class="GameDot2 GameDot"></div>
          <div class="GameDot3 GameDot"></div>
          <div class="GameDot4 GameDot"></div>
        </div>
        <div class="GameSide GameFace5">
          <div class="GameDot1 GameDot"></div>
          <div class="GameDot2 GameDot"></div>
          <div class="GameDot3 GameDot"></div>
          <div class="GameDot4 GameDot"></div>
          <div class="GameDot5 GameDot"></div>
        </div>
        <div class="GameSide GameFace6">
          <div class="GameDot1 GameDot"></div>
          <div class="GameDot2 GameDot"></div>
          <div class="GameDot3 GameDot"></div>
          <div class="GameDot4 GameDot"></div>
          <div class="GameDot5 GameDot"></div>
          <div class="GameDot6 GameDot"></div>
        </div>
      </div>
    </div>
  );
};
export default Dice;
