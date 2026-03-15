import React,{useState} from 'react'
import TicTacToe from './Components/TicTacToe/TicTacToe'
import ModeSelect from "./Components/ModeSelect/ModeSelect";
import DifficultySelect from "./Components/DifficultySelect/DifficultySelect";
import WelcomeScreen from "./Components/WelcomeScreen/WelcomeScreen";

const App = () => {

  const [gameStarted,setGameStarted] = useState(false);
  const [mode,setMode] = useState(null);
  const [difficulty,setDifficulty] = useState(null);
  const [totalMatches,setTotalMatches] = useState(null);

  const goToHome = () => {
    setMode(null);
    setDifficulty(null);
    setTotalMatches(null);
    setGameStarted(false);
  }

  // Welcome Screen
  if(!gameStarted){
    return <WelcomeScreen startGame={()=>setGameStarted(true)}/>
  }

  // Mode select
  if(!mode){
    return <ModeSelect setMode={setMode}/>
  }

  // Ask number of matches
  if(mode && totalMatches === null){
    return(
      <div style={{textAlign:"center",color:"white"}}>
        <h1>How many matches you want to play?</h1>

        <button onClick={()=>setTotalMatches(1)}>1</button>
        <button onClick={()=>setTotalMatches(3)}>3</button>
        <button onClick={()=>setTotalMatches(5)}>5</button>
        <button onClick={()=>setTotalMatches(7)}>7</button>

      </div>
    )
  }

  // Difficulty (only for AI mode)
  if(mode === "ai" && difficulty === null){
    return <DifficultySelect setDifficulty={setDifficulty} goToHome={goToHome}/>
  }

  return (
    <TicTacToe 
      mode={mode}
      difficulty={difficulty}
      totalMatches={totalMatches}
      goToHome={goToHome}
    />
  )
}

export default App