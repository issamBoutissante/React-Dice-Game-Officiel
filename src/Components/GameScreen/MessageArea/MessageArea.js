import React, { useContext, useEffect } from "react";
import "./MessageArea.css";
import { InfoContext } from "../../../InfoContext/InfoContext";

export default function MessageArea({
  ChatRef,
  setMessageHandler,
  message,
  messages,
  onSendMessageHandler,
  toggleMessageAreaActive,
}) {
  const { isHoster, HosterName, FriendName } = useContext(InfoContext);
  const onCloseChatHandler = () => {
    ChatRef.current.style.width = "0";
    toggleMessageAreaActive();
  };
  useEffect(() => {
    console.log(isHoster);
  });
  return (
    <div id="mySideChat" ref={ChatRef} className="sideChat">
      <a className="closebtn" onClick={onCloseChatHandler}>
        &times;
      </a>
      <div className="chat">
        <div className="chat-title">
          <h1>{isHoster ? FriendName : HosterName}</h1>
        </div>
        <div className="messages scrollbar">
          <div className="messages-content">
            <ul style={{ textDecoration: "none" }}>
              {messages.map((mes) => {
                if (mes.isHoster) {
                  return (
                    <li className="message message-personal">{mes.Message}</li>
                  );
                } else {
                  return <li className="message">{mes.Message}</li>;
                }
              })}
            </ul>
          </div>
        </div>

        <div className="message-box">
          <textarea
            value={message}
            type="text"
            className="message-input"
            placeholder="Type message..."
            onChange={setMessageHandler}
          ></textarea>
          <button onClick={onSendMessageHandler} className="message-submit">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
