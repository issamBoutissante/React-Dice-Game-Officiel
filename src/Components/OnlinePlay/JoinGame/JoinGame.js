import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import io from "socket.io-client";
let socket;
export default function JoinGame() {
  const [name, setName] = useState("s");
  const [RoomId, setRoomId] = useState("");
  const [FriendName, setFriendName] = useState("");
  useEffect(() => {
    //initialize a socket
    socket = io("http://localhost:5000");
    //whene game started
    socket.on("GameStarted", ({ hosterName }) => {
      setFriendName(hosterName);
      window.location.href = "/GameScreen";
    });
  }, []);
  const onJoinGameHandler = () => {
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
    </div>
  );
}
