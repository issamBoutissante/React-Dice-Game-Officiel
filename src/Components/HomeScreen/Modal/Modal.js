import React, { useRef } from "react";
import "./Modal.css";
import clickSound from "../../../assets/clickSound.mp3";
let clickAudio = new Audio(clickSound);

const Modal = ({ children, height, CloseModal, width }) => {
  return (
    <div className="modal">
      <div className="modal-name" style={{ height: height, width: width }}>
        <span
          className="close"
          onClick={() => {
            clickAudio.play();
            CloseModal();
          }}
        >
          &times;
        </span>
        <div className="login">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
