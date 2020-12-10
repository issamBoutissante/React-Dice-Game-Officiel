import React, { useState, useContext } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import StartNewGame from "./StartNewGame/StartNewGame";
import JoinGame from "./JoinGame/JoinGame";
import GameScreen from "../GameScreen/GameScreen";
import Context from "../ContexApi/ContexApi";

export default function OnlinePlay() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const onsetSocketHandler = (socket) => {
    setSocket(socket);
  };

  const onsetRoomIdHandler = (roomId) => {
    setRoomId(roomId);
  };
  return (
    <Context.Provider
      value={{
        Socket: socket,
        setSocket: onsetSocketHandler,
        RoomId: roomId,
        setRoomId: onsetRoomIdHandler,
      }}
    >
      <div>
        <BrowserRouter>
          <Route path="/" exact>
            <NavLink style={{ marginRight: "30px" }} to="/StartNewGame">
              Start New Game
            </NavLink>
            <NavLink to="JoinGame">Join Game</NavLink>
          </Route>
          <Route path="/StartNewGame" exact component={StartNewGame}></Route>
          <Route path="/JoinGame" exact component={JoinGame}></Route>
          <Route path="/GameScreen" exact component={GameScreen}></Route>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}
