import React, { Component } from "react";
import "./GameScreen.css";
import { InfoContext } from "../InfoContext/InfoContext";
import Game from "./Game/Game";
export default class GameScreen extends Component {
  static contextType = InfoContext;
  constructor(props) {
    super(props);
    this.player1StyleRef = React.createRef();
    this.player2StyleRef = React.createRef();
  }
  state = {
    finalScore: 15,
    player1: "",
    player2: "",
    randomNumber: 0,
    currentPlayer: "",
    player1Total: 0,
    player2Total: 0,
    player1Score: 0,
    player2Score: 0,
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
    this.setState({ randomNumber: ranNum });
    if (ranNum === 1) {
      //Here we have to add a sound for losing score
      //and vibre the cube
      this.togglePlayer();
      this.resetScore();
    } else {
      if (this.state.currentPlayer === this.state.player1) {
        this.setState((prev) => {
          return {
            player1Score: prev.player1Score + ranNum,
          };
        });
      } else {
        this.setState((prev) => {
          return {
            player2Score: prev.player2Score + ranNum,
          };
        });
      }
    }
  }
  //this function will run when a player hold his points
  ScoreHoldedHandler({ score }) {
    if (this.state.currentPlayer === this.state.player1) {
      this.setState((prev) => {
        return {
          player1Total: prev.player1Total + score,
        };
      });
    } else {
      this.setState((prev) => {
        return {
          player2Total: prev.player2Total + score,
        };
      });
    }
    this.CheckWinner();
    this.resetScore();
  }
  //this function will run whene the game over
  onGameOverHandler({ winner }) {
    if (winner === this.state.player1) {
      this.player1StyleRef.current.classList.add("winer");
    } else {
      this.player2StyleRef.current.classList.add("winer");
    }
  }
  //this player will toggle players and their style
  togglePlayer() {
    if (this.state.currentPlayer === this.state.player1) {
      this.player2StyleRef.current.classList.add("activePlayer");
      this.player1StyleRef.current.classList.remove("activePlayer");
    } else {
      this.player1StyleRef.current.classList.add("activePlayer");
      this.player2StyleRef.current.classList.remove("activePlayer");
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
    console.log("Begining================================================");
    console.log(`the final Score is ${this.state.finalScore}`);
    console.log(
      `the player 1  compared with final score ${
        this.state.player1Total >= this.state.finalScore
      }`
    );
    console.log(`the player 2  total is ${this.state.player2Total}`);
    console.log("End================================================");
    if (this.state.player1Total >= this.state.finalScore) {
      console.log("is bigger");
      Socket.emit("GameOver", { winner: this.state.player1 });
    } else if (this.state.player2Total >= this.state.finalScore) {
      Socket.emit("GameOver", { winner: this.state.player2 });
    } else {
      console.log("again");
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
  }

  render() {
    return (
      <Game
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
      ></Game>
    );
  }
}
