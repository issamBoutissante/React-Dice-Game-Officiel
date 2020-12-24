import React, { useContext, useEffect, useRef, useState } from "react";
import CloseAppIcon from "./CloseAppIcon/CloseAppIcon";
import HomeScreenDice from "./HomeScreenDice/HomeScreenDice";
import StartNewGame from "./StartNewGame/StartNewGame";
import JoinGame from "./JoinGame/JoinGame";
import PlayOffline from "./PlayOffline/PlayOffline";
import "./HomeScreen.css";
import InfoModal from "./InfoModal/InfoModal";
import { InfoContext } from "../../InfoContext/InfoContext";
import ErrorModal from "./ErrorModal/ErrorModal";
import { Redirect } from "react-router-dom";
import RequestJoinModal from "./RequestModal/RequestModal";
import Dialog from "../Dialog/Dialog";
import clickSound from "../../assets/clickSound.mp3";
let clickAudio = new Audio(clickSound);

const HomeScreen = () => {
  const {
    Socket,
    RoomId,
    isHoster,
    setHosterName,
    setFriendName,
    setFriendId,
    FriendId,
    HosterName,
    FriendName,
  } = useContext(InfoContext);
  const onlineRef = useRef(null);
  const offlineRef = useRef(null);
  const [showNewGame, setshowNewGame] = useState(false);
  const [showJoinGame, setShowJoinGame] = useState(false);
  const [showPlayOffline, setshowPlayOffline] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRequestJoin, setShowRequestJoin] = useState(false);
  const [Error, setError] = useState("Something Wrong Happend!!!");
  const [showError, setShowError] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const onGoOnlineHandler = () => {
    clickAudio.play();
    onlineRef.current.style.display = "block";
    offlineRef.current.style.display = "none";
  };
  const onGoOfflineHandler = () => {
    clickAudio.play();
    offlineRef.current.style.display = "block";
    onlineRef.current.style.display = "none";
  };
  const onNewGameHandler = () => {
    clickAudio.play();
    setshowNewGame(true);
  };
  const onJoinGameHandler = () => {
    clickAudio.play();
    setShowJoinGame(true);
  };
  const onPlayHandlerOffline = () => {
    clickAudio.play();
    setshowPlayOffline(true);
  };
  const onAnswerHandler = (isAccepted) => {
    clickAudio.play();
    Socket.emit("requestAnswer", {
      isAccepted,
      name: HosterName,
      nameId: FriendId,
    });
  };
  useEffect(() => {
    Socket.on("requestAccepted", ({ confirmPassword }) => {
      Socket.emit("joinAndStartGame", { confirmPassword });
    });
    Socket.on("requestError", ({ error }) => {
      setError(error);
      setShowError(true);
      Socket.emit("leave", { roomId: RoomId });
    });
    Socket.on("GameStarted", ({ hosterName, frienName }) => {
      if (isHoster) {
        setFriendName(frienName);
      } else {
        setHosterName(hosterName);
      }
      setShowGame(true);
    });
    Socket.on("joinRequest", ({ name, nameId }) => {
      setFriendName(name);
      setFriendId(nameId);
      setShowRequestJoin(true);
    });
  }, []);
  return (
    <>
      <div class="container">
        <CloseAppIcon
          setShowCloseDialog={() => {
            clickAudio.play();
            setShowCloseDialog(true);
          }}
        ></CloseAppIcon>
        <div
          class="info-icon"
          id="Info"
          onClick={() => {
            clickAudio.play();
            setShowInfoModal(true);
          }}
        >
          <i class="fas fa-info-circle"></i>
        </div>
        <header class="nav">
          <div class="logo">
            <span class="Logo-text" style={{ marginLeft: "20px" }}>
              Dice Game
            </span>
          </div>

          <div class="buttons">
            <button class="btn btn1" onClick={onGoOnlineHandler}>
              Online
            </button>
            <button class="btn btn2" onClick={onGoOfflineHandler}>
              Offline
            </button>
          </div>
        </header>
        <div class="sides">
          <div class="side1">
            <div class="btn-online" ref={onlineRef}>
              <button class="btn" onClick={onNewGameHandler}>
                New Game
              </button>
              <button class="btn" onClick={onJoinGameHandler}>
                Join Game
              </button>
            </div>
            <div class="btn-offline" ref={offlineRef}>
              <button class="btn" onClick={onPlayHandlerOffline}>
                Play
              </button>
            </div>
          </div>
          <div class="side2">
            <HomeScreenDice></HomeScreenDice>
          </div>
        </div>
      </div>
      {showNewGame ? (
        <StartNewGame
          clickAudio={clickAudio}
          CloseModal={() => setshowNewGame(false)}
        ></StartNewGame>
      ) : null}
      {showJoinGame ? (
        <JoinGame
          clickAudio={clickAudio}
          CloseModal={() => setShowJoinGame(false)}
        ></JoinGame>
      ) : null}
      {showPlayOffline ? (
        <PlayOffline
          clickAudio={clickAudio}
          CloseModal={() => setshowPlayOffline(false)}
        ></PlayOffline>
      ) : null}
      {showInfoModal ? (
        <InfoModal CloseModal={() => setShowInfoModal(false)}></InfoModal>
      ) : null}
      {showError ? (
        <ErrorModal
          clickAudio={clickAudio}
          error={Error}
          CloseModal={() => setShowError(false)}
        ></ErrorModal>
      ) : null}
      {showGame ? <Redirect to="/GameScreen"></Redirect> : null}
      {showRequestJoin ? (
        <RequestJoinModal
          clickAudio={clickAudio}
          onAnswerHandler={onAnswerHandler}
          CloseModal={() => {
            setShowRequestJoin(false);
          }}
          friendName={FriendName}
        ></RequestJoinModal>
      ) : null}
      {showCloseDialog ? (
        <Dialog
          clickAudio={clickAudio}
          CloseModal={() => {
            setShowCloseDialog(false);
          }}
        ></Dialog>
      ) : null}
    </>
  );
};
export default HomeScreen;
