import React from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ startGame }) => {
  return (
    <div className="welcome-container">

      {/* Animated background */}
      <div className="background-symbols">
        <span>X</span>
        <span>O</span>
        <span>X</span>
        <span>O</span>
        <span>X</span>
        <span>O</span>
      </div>

      {/* Main content */}
      <div className="content">
        <h1 className="game-title">TIC TAC TOE</h1>

        <p className="subtitle">Play the classic game</p>

        <button className="start-btn" onClick={startGame}>
          Start Game
        </button>
      </div>

    </div>
  );
};

export default WelcomeScreen;