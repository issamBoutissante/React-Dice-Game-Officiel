import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import Dialog from "../../Dialog/Dialog";
let socket;

export default function StartNewGame() {
  const [name, setName] = useState("");
  const [RoomId, setRoomId] = useState("");
  const [FriendName, setFriendName] = useState("");
  const [showId, setShowId] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [FriendId, setFriendId] = useState("");
  //whene game started
  useEffect(() => {
    //initialize a socket
    console.log("started again");
    socket = io("http://localhost:5000");
    //on game started
    socket.on("GameStarted", ({ friendName }) => {
      setFriendName(friendName);
      window.location.href = "/GameScreen";
    });
  }, []);
  const onAnswerHandler = (isAccepted) => {
    socket.emit("requestAnswer", {
      isAccepted,
      name,
      nameId: FriendId,
    });
  };
  const onStartNewGameHandler = () => {
    socket.emit("startNewGame", { name }, ({ roomId }) => {
      setRoomId(roomId);
      setShowId(true);
      socket.on("joinRequest", ({ name, nameId }) => {
        setFriendId(nameId);
        setShowDialog(true);
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
      {showDialog ? <Dialog onAnswerHandler={onAnswerHandler}></Dialog> : null}
    </div>
  );
}