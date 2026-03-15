import React from "react";
import "./MdeSelect.css";

const ModeSelect = ({ setMode }) => {

  return (
    <div className="mode-container">

      <h1>Select Game Mode</h1>

      <button onClick={() => setMode("human")}>
        Human vs Human
      </button>

      <button onClick={() => setMode("ai")}>
        Human vs Computer
      </button>

      <button onClick={() => setMode("auto")}>
        Computer vs Computer
      </button>

    </div>
  );
};

export default ModeSelect;