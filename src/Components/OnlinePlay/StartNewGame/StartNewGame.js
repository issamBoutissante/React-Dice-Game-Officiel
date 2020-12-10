import React, { useState, useEffect, useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Dialog from "../../Dialog/Dialog";
import { InfoContext } from "../../InfoContext/InfoContext";

export default function StartNewGame() {
  const { setRoomId, Socket, RoomId } = useContext(InfoContext);
  const [name, setName] = useState("");
  const [showId, setShowId] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [FriendId, setFriendId] = useState("");
  const [FriendName, setFriendName] = useState("");
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    Socket.on("GameStarted", ({ friendName, hosterName }) => {
      setFriendName(friendName);
      setShowGame(true);

      //window.location.href = `/GameScreen?friendName=${friendName}&hosterName=${hosterName}&Socket=${Socket}&roomId=${RoomId}`;
    });
  }, []);
  const onAnswerHandler = (isAccepted) => {
    Socket.emit("requestAnswer", {
      isAccepted,
      name,
      nameId: FriendId,
    });
  };
  const onStartNewGameHandler = () => {
    Socket.emit("startNewGame", { name }, ({ roomId }) => {
      setRoomId(roomId);
      setShowId(true);
      Socket.on("joinRequest", ({ name, nameId }) => {
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
      {showGame ? (
        <Redirect
          to={`/GameScreen?friendName=${name}&hosterName=${FriendName}`}
        ></Redirect>
      ) : null}
    </div>
  );
}
