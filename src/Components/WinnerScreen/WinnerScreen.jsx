import React from "react";
import "./WinnerScreen.css";

const WinnerScreen = ({ winner, onReplay,goToHome }) => {
  return (
    <div className="winner-container">
      <h1 className="winner-text">
  {winner === "Draw"
    ? "Match Draw 🤝"
    : `🏆 ${winner} Wins the Match!`}
</h1>

      <button onClick={onReplay}>
        Play Again
      </button>
      <button onClick={goToHome}>
Home
</button>
    </div>
  );
};

export default WinnerScreen;