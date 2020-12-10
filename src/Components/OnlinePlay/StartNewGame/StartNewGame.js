import React, { useState, useEffect, useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import io from "socket.io-client";
import Dialog from "../../Dialog/Dialog";
import { InfoContext } from "../../InfoContext/InfoContext";
let socket;

export default function StartNewGame() {
  const { setRoomId, setSocket, RoomId } = useContext(InfoContext);
  const [name, setName] = useState("");
  const [showId, setShowId] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [FriendId, setFriendId] = useState("");
  //whene game started
  useEffect(() => {
    //initialize a socket

    socket = io("http://localhost:5000");
    setSocket(socket);
    //on game started
    socket.on("GameStarted", ({ friendName, hosterName }) => {
      window.location.href = `/GameScreen?friendName=${friendName}&hosterName=${hosterName}&socket=${socket}&roomId=${RoomId}`;
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
        value={name}
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
