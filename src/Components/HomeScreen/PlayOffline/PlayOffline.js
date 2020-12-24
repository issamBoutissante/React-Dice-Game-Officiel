import React, { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { InfoContext } from "../../../InfoContext/InfoContext";
import { Redirect } from "react-router-dom";

export default function PlayOffline({ CloseModal, clickAudio }) {
  const { setHosterName, setFriendName } = useContext(InfoContext);
  const [showGame, setShowGame] = useState(false);
  const onPlayHandler = () => {
    setShowGame(true);
  };
  return (
    <Modal height="50%" CloseModal={CloseModal}>
      <div>
        <label for="name">Enter first player name:</label>
        <input
          autoComplete="false"
          type="text"
          name="name"
          onChange={(e) => setHosterName(e.target.value)}
          placeholder="Enter first player name.."
        />
        <br />
        <label htmlFor="name">Enter second player name:</label>
        <input
          autoComplete="false"
          type="text"
          name="name"
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="Enter second player name.."
        />
        <button
          onClick={() => {
            clickAudio.play();
            onPlayHandler();
          }}
        >
          Start
        </button>
      </div>
      {showGame ? <Redirect to="/GameScreenOffline"></Redirect> : null}
    </Modal>
  );
}
