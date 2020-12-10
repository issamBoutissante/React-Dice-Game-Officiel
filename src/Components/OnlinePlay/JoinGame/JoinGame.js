import React, { useContext, useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { InfoContext } from "../../InfoContext/InfoContext";

export default function JoinGame() {
  const { setRoomId, Socket, RoomId } = useContext(InfoContext);
  const [name, setName] = useState("");
  const [FriendName, setFriendName] = useState("");
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    Socket.on("GameStarted", ({ hosterName, friendName }) => {
      setFriendName(hosterName);
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
    Socket.emit("joinGame", { name, roomId: RoomId }, ({ error }) => {
      if (error) alert(error);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="enter you name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          console.log(name);
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
      {showGame ? (
        <Redirect
          to={`/GameScreen?friendName=${name}&hosterName=${FriendName}`}
        ></Redirect>
      ) : null}
    </div>
  );
}
