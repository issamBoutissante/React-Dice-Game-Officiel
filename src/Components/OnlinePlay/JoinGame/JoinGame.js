import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import { InfoContext } from "../../InfoContext/InfoContext";
let socket;

export default function JoinGame() {
  const { setRoomId, setSocket, RoomId } = useContext(InfoContext);
  const [name, setName] = useState("s");
  useEffect(() => {
    //initialize a socket
    socket = io("http://localhost:5000");
    setSocket(socket);
    //whene game started
    socket.on("GameStarted", ({ hosterName, friendName }) => {
      window.location.href = `/GameScreen?friendName=${friendName}&hosterName=${hosterName}`;
    });
  }, []);
  const onJoinGameHandler = () => {
    socket.on("requestAccepted", ({ confirmPassword }) => {
      socket.emit("joinAndStartGame", { confirmPassword });
    });
    socket.on("requestError", ({ error }) => {
      alert(error);
      socket.emit("leave", { roomId: RoomId });
    });
    socket.emit("joinGame", { name, roomId: RoomId }, ({ error }) => {
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
        value={RoomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      ></input>
      <button onClick={onJoinGameHandler}>Join</button>
      <NavLink to="/"> Back</NavLink>
    </div>
  );
}
