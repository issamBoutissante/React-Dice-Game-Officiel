import React, { useContext, useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import io from "socket.io-client";
import Context from "../../ContexApi/ContexApi";
let socket;

export default function JoinGame() {
  const { setRoomId, setSocket, RoomId } = useContext(Context);
  const [name, setName] = useState("s");
  const [FriendName, setFriendName] = useState("");
  useEffect(() => {
    //initialize a socket
    socket = io("http://localhost:5000");
    setSocket(socket);
    //whene game started
    socket.on("GameStarted", ({ hosterName, friendName }) => {
      setFriendName(hosterName);
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
      {/* <Redirect
        to={{
          pathname: "/GameScreen",
          state: { socket },
        }}
      ></Redirect> */}
      <button onClick={onJoinGameHandler}>Join</button>
      <NavLink to="/"> Back</NavLink>
    </div>
  );
}
