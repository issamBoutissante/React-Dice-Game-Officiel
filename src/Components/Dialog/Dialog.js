import React from "react";
import "./Dialog.css";

export default function Dialog({ onAnswerHandler }) {
  return (
    <div className="dialog">
      <button onClick={onAnswerHandler.bind(null, true)}>Accept</button>
      <button onClick={onAnswerHandler.bind(null, false)}>Reject</button>
    </div>
  );
}
