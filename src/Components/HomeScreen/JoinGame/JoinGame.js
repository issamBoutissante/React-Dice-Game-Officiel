import React, { useContext, useEffect } from "react";
import Modal from "../Modal/Modal";
import { InfoContext } from "../../../InfoContext/InfoContext";

export default function JoinGame({ CloseModal, clickAudio }) {
  const {
    setRoomId,
    Socket,
    RoomId,
    setFriendName,
    FriendName,
    setIsHoster,
  } = useContext(InfoContext);
  const onJoinGameHandler = () => {
    Socket.emit(
      "joinGame",
      { name: FriendName, roomId: RoomId },
      ({ error }) => {
        if (error) alert(error);
      }
    );
  };
  useEffect(() => {
    setIsHoster(false);
  }, []);

  return (
    <Modal height="50%" CloseModal={CloseModal}>
      <div id="name-container">
        <label htmlFor="name">Enter your name:</label>
        <input
          autoComplete="false"
          type="text"
          style={{ color: "#50abf1" }}
          name="name"
          id="name"
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="Enter your name.."
        />
        <br />
        <label htmlFor="name">Enter Room ID:</label>
        <input
          autoComplete="false"
          type="text"
          style={{ color: "#50abf1" }}
          name="id"
          id="roomID"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          placeholder="Enter Room ID.."
        />
        <button
          onClick={() => {
            clickAudio.play();
            onJoinGameHandler();
          }}
        >
          Join
        </button>
      </div>
    </Modal>
  );
}
