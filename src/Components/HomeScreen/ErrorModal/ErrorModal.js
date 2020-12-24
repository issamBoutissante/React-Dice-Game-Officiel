import React from "react";
import Modal from "../Modal/Modal";
export default function ErrorModal({ CloseModal, error, clickAudio }) {
  return (
    <Modal height="150px" CloseModal={CloseModal}>
      <div id="Refuse-container" style={{ paddingTop: "25px" }}>
        <label>{error}</label>
        <button
          onClick={() => {
            clickAudio.play();
            CloseModal();
          }}
        >
          OK
        </button>
      </div>
    </Modal>
  );
}
