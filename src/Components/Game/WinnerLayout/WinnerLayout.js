import React, { useEffect, useRef, useState } from "react";
import WinImage from "../../../assets/win.png";
import "./WinnerLayout.css";
import { Redirect } from "react-router-dom";
import clickSound from "../../../assets/clickSound.mp3";
let clickAudio = new Audio(clickSound);

export default function WinnerLayout({
  winner,
  onStartNewGameHandler,
  CloseModal,
}) {
  const CanvasRef = useRef(null);
  const [goBack, setGoBack] = useState(false);
  const onBackToMenu = () => {
    setGoBack(true);
  };
  useEffect(() => {
    var ctx = CanvasRef.current.getContext("2d");

    var cwidth, cheight;
    var shells = [];
    var pass = [];

    var colors = ["#018bcc", "#018bcc", "#018bcc", , "#018bcc", "#018bcc"];

    window.onresize = function () {
      reset();
    };
    reset();
    function reset() {
      cwidth = window.innerWidth;
      cheight = window.innerHeight;
      CanvasRef.current.width = cwidth;
      CanvasRef.current.height = cheight;
    }

    function newShell() {
      var left = Math.random() > 0.5;
      var shell = {};
      shell.x = 1 * left;
      shell.y = 1;
      shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
      shell.yoff = 0.01 + Math.random() * 0.007;
      shell.size = Math.random() * 6 + 3;
      shell.color = colors[Math.floor(Math.random() * colors.length)];

      shells.push(shell);
    }
    function newPass(shell) {
      var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
      for (let j = 0; j < pasCount; j++) {
        var pas = {};
        pas.x = shell.x * cwidth;
        pas.y = shell.y * cheight;

        var a = Math.random() * 4;
        var s = Math.random() * 10;

        pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
        pas.yoff = s * Math.sin(a * (Math.PI / 2));

        pas.color = shell.color;
        pas.size = Math.sqrt(shell.size);

        if (pass.length < 1000) {
          pass.push(pas);
        }
      }
    }

    var lastRun = 0;
    Run();
    function Run() {
      var dt = 1;
      if (lastRun != 0) {
        dt = Math.min(50, performance.now() - lastRun);
      }
      lastRun = performance.now();

      //ctx.clearRect(0, 0, cwidth, cheight);
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(0, 0, cwidth, cheight);

      if (shells.length < 10 && Math.random() > 0.96) {
        newShell();
      }

      for (let ix in shells) {
        var shell = shells[ix];

        ctx.beginPath();
        ctx.arc(
          shell.x * cwidth,
          shell.y * cheight,
          shell.size,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= shell.xoff * dt * 0.001;
        shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

        if (shell.yoff < -0.005) {
          newPass(shell);
          shells.splice(ix, 1);
        }
      }

      for (let ix in pass) {
        var pas = pass[ix];

        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
        ctx.fillStyle = pas.color;
        ctx.fill();

        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= pas.xoff * dt * 0.001;
        pas.yoff -= (pas.yoff + 5) * dt * 0.0005;
        pas.size -= dt * 0.002 * Math.random();

        if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
          pass.splice(ix, 1);
        }
      }
      requestAnimationFrame(Run);
    }
  }, []);
  return (
    <>
      {/* //  <!-- The Modal Info--> */}
      <div className="modalWinner">
        {/* <!-- Modal content for Info --> */}
        <div className="modal-win">
          <canvas id="Canvas" ref={CanvasRef}>
            {" "}
          </canvas>
          <img src={WinImage} />
          <div id="winner-container">
            <span className="closeWin" onClick={CloseModal}>
              &times;
            </span>
            <span className="winner-name">{winner} Wins!</span>
            <div className="btnWin">
              <button
                onClick={() => {
                  clickAudio.play();
                  onStartNewGameHandler();
                }}
              >
                NEW GAME
              </button>
              <button
                onClick={() => {
                  clickAudio.play();
                  onBackToMenu();
                }}
              >
                START MENU
              </button>
            </div>
          </div>
        </div>
      </div>
      {goBack ? <Redirect to="/"></Redirect> : null}
    </>
  );
}
