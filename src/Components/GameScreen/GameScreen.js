import React, { Component } from "react";
import { InfoContext } from "../../InfoContext/InfoContext";
import Game from "../Game/Game";
import WinnerLayout from "../Game/WinnerLayout/WinnerLayout";
import rollSound from "../../assets/rollSound.mp3";
let rollAudio = new Audio(rollSound);

const position = {
  1: ["rotateX(180deg) rotateY(1260deg)", "rotateX(-180deg) rotateY(-1260deg)"],
  2: [
    "rotateX(1620deg) rotateY(1800deg)",
    "rotateX(-1620deg) rotateY(-1800deg)",
  ],
  3: ["rotateX(1620deg) rotateY(90deg)", "rotateX(-1620deg) rotateY(-90deg)"],
  4: ["rotateX(360deg) rotateY(1170deg)", "rotateX(-360deg) rotateY(-1170deg)"],
  5: [
    "rotateX(1350deg) rotateY(1710deg)",
    "rotateX(-1350deg) rotateY(-1710deg)",
  ],
  6: ["rotateX(810deg) rotateY(1890deg)", "rotateX(-810deg) rotateY(-1890deg)"],
};

export default class GameScreen extends Component {
  static contextType = InfoContext;
  constructor(props) {
    super(props);
    this.player1StyleRef = React.createRef();
    this.player2StyleRef = React.createRef();
    this.CubeRef = React.createRef();
  }
  state = {
    finalScore: 100,
    player1: "",
    player2: "",
    randomNumber: 0,
    currentPlayer: "",
    player1Total: 0,
    player2Total: 0,
    player1Score: 0,
    player2Score: 0,
    iswinner: false,
    winner: "",
  };
  //When a player Click Dice
  onRollDiceHandler() {
    const { Socket, RoomId } = this.context;
    Socket.emit("RollDice", { roomId: RoomId });
  }

  //When a player click hold
  onHoldHandler() {
    const { Socket, RoomId } = this.context;
    if (this.state.currentPlayer === this.state.player1) {
      Socket.emit("Hold", { roomId: RoomId, score: this.state.player1Score });
    } else {
      Socket.emit("Hold", { roomId: RoomId, score: this.state.player2Score });
    }
  }
  //When the server send a ranDonm number
  DiceRolledHandler({ ranNum }) {
    //this function will disable the click event in the page
    const disableClickEvent = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    setTimeout(() => {
      this.CubeRef.current.classList.remove("RollDice");
      this.CubeRef.current.style.transform = position[ranNum][0];
      this.ChangeScore({ ranNum });
      document.removeEventListener("click", disableClickEvent, true);
    }, 1000);
    rollAudio.play();
    this.CubeRef.current.style.setProperty("--halfRoll", position[ranNum][1]);
    this.CubeRef.current.style.setProperty("--fullRoll", position[ranNum][0]);
    this.CubeRef.current.classList.add("RollDice");
    document.addEventListener("click", disableClickEvent, true);
  }
  //ChangeScore
  ChangeScore({ ranNum }) {
    if (ranNum === 1) {
      //Here we have to add a sound for losing score
      //and vibre the cube
      this.togglePlayer();
      this.resetScore();
    } else {
      if (this.state.currentPlayer === this.state.player1) {
        let time = 0;
        for (
          let i = this.state.player1Score;
          i < this.state.player1Score + ranNum;
          i++
        ) {
          time += 200;
          setTimeout(() => {
            this.setState((prev) => {
              return {
                player1Score: prev.player1Score + 1,
              };
            });
          }, time);
        }
      } else {
        let time = 0;
        for (
          let i = this.state.player2Score;
          i < this.state.player2Score + ranNum;
          i++
        ) {
          time += 200;
          setTimeout(() => {
            this.setState((prev) => {
              return {
                player2Score: prev.player2Score + 1,
              };
            });
          }, time);
        }
      }
    }
  }
  //this function will run when a player hold his points
  ScoreHoldedHandler({ score }) {
    setTimeout(() => {
      this.CheckWinner();
      this.resetScore();
    }, score * 50);
    if (this.state.currentPlayer === this.state.player1) {
      let time = 0;

      for (let i = 0; i < score; i++) {
        time += 50;
        setTimeout(() => {
          this.setState((prev) => {
            return {
              player1Total: prev.player1Total + 1,
            };
          });
        }, time);
      }
    } else {
      let time = 0;

      for (let i = 0; i < score; i++) {
        time += 50;
        setTimeout(() => {
          this.setState((prev) => {
            return {
              player2Total: prev.player2Total + 1,
            };
          });
        }, time);
      }
    }
  }
  //this function will run whene the game over
  onGameOverHandler({ winner }) {
    this.setState({ winner: winner, iswinner: true });
  }
  //this player will toggle players and their style
  togglePlayer() {
    if (this.state.currentPlayer === this.state.player1) {
      this.player1StyleRef.current.classList.add("notActive");
      this.player1StyleRef.current.classList.remove("active");
      this.player2StyleRef.current.classList.add("active");
      this.player2StyleRef.current.classList.remove("notActive");
    } else {
      this.player2StyleRef.current.classList.add("notActive");
      this.player2StyleRef.current.classList.remove("active");
      this.player1StyleRef.current.classList.add("active");
      this.player1StyleRef.current.classList.remove("notActive");
    }
    this.setState((prev) => {
      return {
        currentPlayer:
          prev.currentPlayer === prev.player1 ? prev.player2 : prev.player1,
      };
    });
  }
  //this will set the players score to 0
  resetScore() {
    this.setState({
      player1Score: 0,
      player2Score: 0,
    });
  }
  //this function will check if there is a winner
  CheckWinner() {
    const { Socket } = this.context;
    if (this.state.player1Total > this.state.finalScore) {
      Socket.emit("GameOver", { winner: this.state.player1 });
    } else if (this.state.player2Total > this.state.finalScore) {
      Socket.emit("GameOver", { winner: this.state.player2 });
    } else {
      this.togglePlayer();
    }
  }
  componentDidMount() {
    const { HosterName, FriendName, Socket } = this.context;
    this.setState({
      player1: HosterName,
      player2: FriendName,
      currentPlayer: HosterName,
    });
    Socket.on("DiceRolled", this.DiceRolledHandler.bind(this));
    Socket.on("ScoreHolded", this.ScoreHoldedHandler.bind(this));
    Socket.on("GameOvered", this.onGameOverHandler.bind(this));
    Socket.on("onPlayAgain", this.onPlayNewGameHandler.bind(this));
  }

  onPlayNewGameHandler() {
    this.setState({
      player1Total: 0,
      player2Total: 0,
      player1Score: 0,
      player2Score: 0,
    });
    this.setState({ iswinner: false });
  }
  onPlayAgainHandler() {
    const { Socket, RoomId } = this.context;
    Socket.emit("PlayAgain", { RoomId });
  }
  //this fuction will start new Game when game is over
  onStartNewGameHandler() {
    this.onPlayAgainHandler();
  }
  //this function will send message

  render() {
    return (
      <>
        <Game
          showMessageIcon={true}
          player1={this.state.player1}
          player2={this.state.player2}
          player1Score={this.state.player1Score}
          player2Score={this.state.player2Score}
          player1Total={this.state.player1Total}
          player2Total={this.state.player2Total}
          randomNumber={this.state.randomNumber}
          onRollDiceHandler={this.onRollDiceHandler.bind(this)}
          onHoldHandler={this.onHoldHandler.bind(this)}
          player1StyleRef={this.player1StyleRef}
          player2StyleRef={this.player2StyleRef}
          onPlayAgainHandler={this.onPlayAgainHandler.bind(this)}
          CubeRef={this.CubeRef}
        ></Game>
        {this.state.iswinner ? (
          <WinnerLayout
            onStartNewGameHandler={this.onStartNewGameHandler.bind(this)}
            winner={this.state.winner}
          ></WinnerLayout>
        ) : null}
      </>
    );
  }
}
