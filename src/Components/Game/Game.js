import React, { Component } from "react";
import { InfoContext } from "../../InfoContext/InfoContext";
import Dice from "./GameDice/GameDice";
import "./Game.css";
import LittleCube from "../LittleCube/LittleCube";
import { Redirect } from "react-router-dom";
import Modal from "../HomeScreen/Modal/Modal";
import MessageArea from "../GameScreen/MessageArea/MessageArea";
import clickSound from "../../assets/clickSound.mp3";
let clickAudio = new Audio(clickSound);

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.ChatRef = React.createRef();
    this.ChatIconRef = React.createRef();
    this.GameRef = React.createRef();
  }
  static contextType = InfoContext;
  state = {
    message: "",
    messages: [],
    BackToHome: false,
    showDialogModal: false,
    isMessageAreaOpen: false,
    CountNewMessages: 0,
  };
  onSendMessageHandler() {
    const { Socket, RoomId, isHoster } = this.context;
    Socket.emit("SendMessage", {
      RoomId,
      message: { Message: this.state.message, isHoster },
    });
    this.setState({ message: "" });
  }
  onNewMessageHandler({ message }) {
    this.setState((prev) => {
      return {
        messages: [...prev.messages, message],
      };
    });
    if (!this.state.isMessageAreaOpen) {
      this.setState((prev) => {
        return {
          CountNewMessages: prev.CountNewMessages + 1,
        };
      });
    }
  }
  componentDidMount() {
    const { Socket } = this.context;
    Socket.on("NewMessage", this.onNewMessageHandler.bind(this));
  }
  onBackToHomeHandler() {
    //this.setState({ BackToHome: true });
    document.location.replace("/");
  }
  //this will open the messaging area
  onOpenMessageArea() {
    this.ChatRef.current.style.width = "350px";
    this.toggleMessageAreaActive();
  }
  toggleMessageAreaActive() {
    this.setState((prev) => {
      return {
        isMessageAreaOpen: prev.isMessageAreaOpen ? false : true,
        CountNewMessages: 0,
      };
    });
  }
  setMessageHandler(e) {
    this.setState({ message: e.target.value });
  }
  render() {
    const {
      player1,
      player2,
      player1Score,
      player2Score,
      player1Total,
      player2Total,
      onRollDiceHandler,
      onHoldHandler,
      player1StyleRef,
      player2StyleRef,
      CubeRef,
      onPlayAgainHandler,
    } = this.props;
    return (
      <div ref={this.GameRef} className="GameNontainer">
        <div className="GameNav-container">
          <div className="chat-icon">
            <i
              className="fas fa-arrow-circle-left back"
              onClick={() => {
                clickAudio.play();
                this.onBackToHomeHandler();
              }}
            ></i>
            {this.props.showMessageIcon ? (
              <>
                <i
                  ref={this.ChatIconRef}
                  onClick={() => {
                    clickAudio.play();
                    this.onOpenMessageArea();
                  }}
                  className="fas fa-comments chat"
                ></i>
                {this.state.CountNewMessages != 0 ? (
                  <span className="newMessages">
                    {this.state.CountNewMessages}
                  </span>
                ) : null}
              </>
            ) : null}
          </div>
          <div
            className="goNewGame"
            onClick={() => {
              clickAudio.play();
              onPlayAgainHandler();
            }}
          >
            <i className="far fa-plus-square"></i>
            <span>New Game</span>
          </div>
          <div
            className="GameClose-icon"
            onClick={() => this.setState({ showDialogModal: true })}
          ></div>
        </div>
        <div className="layout-container">
          <div className="side-container active" ref={player1StyleRef}>
            <div className="player-name">
              <span>{player1}</span>
              <LittleCube></LittleCube>
            </div>
            <div className="total-point">
              <span id="total-score">{player1Total} </span>
            </div>
            <div className="current-point">
              <span>Current</span>
              <div>
                <span id="current-score">{player1Score}</span>
              </div>
            </div>
          </div>
          <div className="side-container notActive" ref={player2StyleRef}>
            <div className="player-name">
              <span>{player2}</span>
              <LittleCube></LittleCube>
            </div>
            <div className="total-point">
              <span id="total-score">{player2Total} </span>
            </div>
            <div className="current-point">
              <span>Current</span>
              <div>
                <span id="current-score">{player2Score}</span>
              </div>
            </div>
          </div>
        </div>
        <Dice CubeRef={CubeRef} onRollDiceHandler={onRollDiceHandler}></Dice>
        <div className="hold-container">
          <button
            id="holdbtn"
            onClick={() => {
              clickAudio.play();
              onHoldHandler();
            }}
          >
            HOLD
          </button>
        </div>
        <MessageArea
          ChatRef={this.ChatRef}
          toggleMessageAreaActive={this.toggleMessageAreaActive.bind(this)}
          messages={this.state.messages}
          setMessageHandler={this.setMessageHandler.bind(this)}
          message={this.state.message}
          onSendMessageHandler={this.onSendMessageHandler.bind(this)}
        ></MessageArea>
        {/* i use this to back to home but i replaced it with documetn location */}
        {/* {this.state.BackToHome ? <Redirect to="/"></Redirect> : null} */}
        {this.state.showDialogModal ? (
          <Modal CloseModal={this.setState({ showDialogModal: false })}></Modal>
        ) : null}
      </div>
    );
  }
}
