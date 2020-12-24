import React from "react";
import Modal from "../Modal/Modal";

export default function InfoModal({ CloseModal }) {
  return (
    <Modal CloseModal={CloseModal} height="80%" width="90%">
      <div>
        <p style={{ fontSize: "20px" }}>
          - The game has 2 players, playing in rounds <br></br> <br></br>- In
          each turn, a player rolls a dice as many times as he whishes. Each
          result get added to his ROUND score <br></br> <br></br>- BUT, if the
          player rolls a 1, all his ROUND score gets lost. After that, it's the
          next player's turn that, it's the next player's turn <br></br>{" "}
          <br></br>- The player can choose to 'Hold', which means that his ROUND
          score gets added to his GLBAL score. After that, it's the next
          player's turn <br></br> <br></br>- The first player to reach 100
          points on GLOBAL score wins the game <br></br> <br></br>- The players
          can play online and offline
        </p>
      </div>
    </Modal>
  );
}
