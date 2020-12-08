import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
let socket;

export default function StartNewGame() {
  const [name, setName] = useState("");
  const [RoomId, setRoomId] = useState("");
  const [FriendName, setFriendName] = useState("");
  const [showId, setShowId] = useState(false);
  //whene game started
  useEffect(() => {
    //initialize a socket
    console.log("started again");
    socket = io("http://localhost:5000");
    //on game started
    socket.on("GameStarted", ({ friendName }) => {
      setFriendName(friendName);
      alert(`you and ${friendName} are playing on room ${RoomId}`);
    });
  }, []);

  const onStartNewGameHandler = () => {
    socket.emit("startNewGame", { name }, ({ roomId }) => {
      setRoomId(roomId);
      setShowId(true);
      socket.on("joinRequest", ({ name }) => {
        alert(`${name} asked to join the game`);
        socket.emit("requestAnswer", {
          isAccepted: true,
          name,
        });
      });
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="enter you name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={onStartNewGameHandler}>Start Game</button>
      <NavLink to="/"> Back</NavLink>
      {showId ? (
        <input type="text" value={`this is your id : ${RoomId}`}></input>
      ) : null}
    </div>
  );
}
