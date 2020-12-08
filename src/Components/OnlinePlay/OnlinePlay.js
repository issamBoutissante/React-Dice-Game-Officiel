import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import StartNewGame from "./StartNewGame/StartNewGame";
import JoinGame from "./JoinGame/JoinGame";

export default function OnlinePlay() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact>
          <NavLink style={{ marginRight: "30px" }} to="/StartNewGame">
            Start New Game
          </NavLink>
          <NavLink to="JoinGame">Join Game</NavLink>
        </Route>
        <Route path="/StartNewGame" component={StartNewGame}></Route>
        <Route path="/JoinGame" component={JoinGame}></Route>
      </BrowserRouter>
    </div>
  );
}
