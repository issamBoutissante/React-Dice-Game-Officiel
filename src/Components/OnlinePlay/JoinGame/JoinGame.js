import React, { useContext, useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { InfoContext } from "../../InfoContext/InfoContext";

export default function JoinGame() {
  const {
    setRoomId,
    Socket,
    RoomId,
    setFriendName,
    setHosterName,
    FriendName,
    HosterName,
  } = useContext(InfoContext);
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    Socket.on("GameStarted", ({ hosterName }) => {
      setHosterName(hosterName);
      setShowGame(true);
      //window.location.href = `/GameScreen?friendName=${friendName}&hosterName=${hosterName}`;
    });
  }, []);
  const onJoinGameHandler = () => {
    Socket.on("requestAccepted", ({ confirmPassword }) => {
      Socket.emit("joinAndStartGame", { confirmPassword });
    });
    Socket.on("requestError", ({ error }) => {
      alert(error);
      Socket.emit("leave", { roomId: RoomId });
    });
    Socket.emit(
      "joinGame",
      { name: FriendName, roomId: RoomId },
      ({ error }) => {
        if (error) alert(error);
      }
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="enter you name"
        onChange={(e) => {
          setFriendName(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="enter the game id"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      ></input>
      <button onClick={onJoinGameHandler}>Join</button>
      <NavLink to="/"> Back</NavLink>
      {showGame ? <Redirect to={"/GameScreen"}></Redirect> : null}
    </div>
  );
}
