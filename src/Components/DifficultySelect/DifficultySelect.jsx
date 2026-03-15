import React from "react";

const DifficultySelect = ({setDifficulty,goToHome}) => {

  return (

<div className="difficulty-container">

  <h1>Select Difficulty</h1>

  <div className="difficulty-buttons">
    <button onClick={()=>setDifficulty("easy")}>Easy</button>
    <button onClick={()=>setDifficulty("medium")}>Medium</button>
    <button onClick={()=>setDifficulty("hard")}>Hard</button>
  </div>

  <button className="back-btn" onClick={goToHome}>
    Back
  </button>

</div>
  )
}

export default DifficultySelect;