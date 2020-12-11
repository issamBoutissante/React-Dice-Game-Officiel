import React, { useState, useEffect, useContext, Component } from "react";
import "./GameScreen.css";
import { InfoContext } from "../InfoContext/InfoContext";
import Game from "./Game/Game";

export default class GameScreen extends Component {
  static contextType = InfoContext;
  state = {
    player1: this.context.HosterName,
    player2: this.context.FriendName,
    randomNumber: 0,
    currentPlayer: this.context.HosterName,
    player1Total: 0,
    player2Total: 0,
    player1Score: 0,
    player2Score: 0,
  };

  componentDidMount() {
    this.context.Socket.on("DiceRolled", ({ ranNum }) => {
      console.log(`Dice Rolled and ranNum=${ranNum}`);
      this.setState({ randomNumber: ranNum });
      if (ranNum == 1) {
        this.setState((prev) => {
          return {
            currentPlayer:
              prev.currentPlayer == this.state.player1
                ? this.state.player2
                : this.state.player1,
            player1Score: 0,
            player2Score: 0,
          };
        });
      } else {
        this.state.currentPlayer == this.state.player1
          ? this.setState((prev) => {
              return {
                player1Score: prev.player1Score + ranNum,
              };
            })
          : this.setState((prev) => {
              return {
                player2Score: prev.player2Score + ranNum,
              };
            });
      }
    });

    this.context.Socket.on("ScoreHolded", ({ score }) => {
      console.log(`score holded and score=${score}`);

      this.state.currentPlayer === this.state.player1
        ? this.setState((prev) => {
            return {
              player1Total: prev.player1Total + score,
            };
          })
        : this.setState((prev) => {
            return {
              player2Total: prev.player2Total + score,
            };
          });
    });
  }
  onRollDiceHandler() {
    this.context.Socket.emit("RollDice", { roomId: this.context.RoomId });
  }
  onHoldHandler() {
    this.state.currentPlayer == this.state.player1
      ? this.context.Socket.emit("Hold", { score: this.context.player1Score })
      : this.context.Socket.emit("Hold", { score: this.context.player2Score });
    this.setState((prev) => {
      return {
        currentPlayer:
          prev.currentPlayer == this.state.player1
            ? this.state.player2
            : this.state.player1,
        player1Score: 0,
        player2Score: 0,
      };
    });
  }
  render() {
    return (
      <Game
        {...this.state}
        player1={this.state.player1}
        player2={this.state.player2}
        player1Score={this.state.player1Score}
        player2Score={this.state.player2Score}
        player1Total={this.state.player1Total}
        player2Total={this.state.player2Total}
        onRollDiceHandler={this.onRollDiceHandler.bind(this)}
        onHoldHandler={this.onHoldHandler.bind(this)}
      ></Game>
    );
  }
}

// export default function GameScreen(props) {
//   const { Socket, RoomId } = useContext(InfoContext);
//   const [player1, setPlayer1] = useState("");
//   const [player2, setPlayer2] = useState("");
//   const [randomNumber, setRandomNumber] = useState(0);
//   const [currentPlayer, setCurrentPlayer] = useState("");
//   const [player1Total, setPlayer1Total] = useState(0);
//   const [player2Total, setPlayer2Total] = useState(0);
//   const [player1Score, setPlayer1Score] = useState(0);
//   const [player2Score, setPlayer2Score] = useState(0);
//   useEffect(() => {
//     const params = querystring.parse(props.location.search);
//     setPlayer1(params["hosterName"]);
//     setPlayer2(params["?friendName"]);
//     setTimeout(() => {
//       let current = player1;
//       alert(current);
//       setCurrentPlayer(current);
//       alert("the curren t " + currentPlayer);

//       console.log("the current player is " + currentPlayer);
//     }, 1000);
//   }, []);
//   useEffect(() => {
//     console.log("the dicerolled and scoreholded listeners are set.");
//     Socket.on("DiceRolled", ({ ranNum }) => {
//       console.log(`Dice Rolled and ranNum=${ranNum}`);
//       setRandomNumber(ranNum);
//       if (ranNum == 1) {
//         setCurrentPlayer((prev) => (player1 === prev ? player2 : player1));
//         setPlayer2Score(0);
//         setPlayer1Score(0);
//       } else {
//         currentPlayer == player1
//           ? setPlayer1Score((prev) => prev + ranNum)
//           : setPlayer2Score((prev) => prev + ranNum);
//       }
//     });
//     Socket.on("ScoreHolded", ({ score }) => {
//       console.log(`score holded and score=${score}`);
//       currentPlayer === player1
//         ? setPlayer1Total((prev) => prev + score)
//         : setPlayer2Total((prev) => prev + score);
//       setPlayer1Score(0);
//       setPlayer2Score(0);
//     });
//   }, []);
//   useEffect(() => {
//     console.log("==========================");
//     console.log(`currentPlayer=${currentPlayer}`);
//     console.log(`player1Score=${player1Score}`);
//     console.log(`player2Score=${player2Score}`);
//     console.log(`player1Total=${player1Total}`);
//     console.log(`player2Total=${player2Total}`);
//     console.log("==========================");
//   });
//   const onRollDiceHandler = () => {
//     Socket.emit("RollDice", { roomId: RoomId });
//   };
//   const onHoldHandler = () => {
//     currentPlayer == player1
//       ? Socket.emit("Hold", { score: player1Score })
//       : Socket.emit("Hold", { score: player2Score });
//     setCurrentPlayer((prev) => (player1 === prev ? player2 : player1));
//     setPlayer1Score(0);
//     setPlayer2Score(0);
//   };
//   return (
//     <section className="GameContainer">
//       <section className="GameScene">
//         <section className="player1 player activePlayer">
//           <section className="GessedNumberArea">
//             <h1>{player1}</h1>
//             <h1 className="total_1 number">{player1Total}</h1>
//           </section>
//           <section className="playerPoints">
//             <p>current</p>
//             <h1 className="current_1">{player1Score}</h1>
//           </section>
//         </section>
//         <div className="buttons Buttons above newGame">New Game</div>
//         <div className="buttons image">{randomNumber}</div>
//         <div className="buttons Buttons rollDice" onClick={onRollDiceHandler}>
//           Roll Dice
//         </div>
//         <div className="buttons Buttons below hold" onClick={onHoldHandler}>
//           Hold
//         </div>
//         <section className="player2 player">
//           <section className="GessedNumberArea">
//             <h1>{player2}</h1>
//             <h1 className="total_2 number">{player2Total}</h1>
//           </section>
//           <section className="playerPoints">
//             <p>current</p>
//             <h1 className="current_2">{player2Score}</h1>
//           </section>
//         </section>
//       </section>
//     </section>
//   );
// }
