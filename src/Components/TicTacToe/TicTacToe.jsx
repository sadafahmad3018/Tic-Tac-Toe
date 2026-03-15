import React, { useState, useEffect, useRef } from 'react'
import './TicTacToe.css'
import WinnerScreen from "../WinnerScreen/WinnerScreen";

const TicTacToe = ({ mode,difficulty,totalMatches,goToHome }) => {

  const [board,setBoard]= useState(Array(9).fill(null))
  const [isXTurn,setXTurn]=useState(true);
  const [winner,setWinner]=useState(null);
  const [winningLine,setWinningLine] = useState(null);
  const [gameOver,setGameOver] = useState(false);

  const [score,setScore] = useState({
    X:0,
    O:0,
    draw:0
  });

  const [currentMatch,setCurrentMatch] = useState(1);

  const timerRef = useRef(null);

  // Human vs Computer
  useEffect(() => {

    if(mode === "ai" && difficulty && !isXTurn && !gameOver){

        timerRef.current = setTimeout(()=>{
            computerMove(board);
        },800);

    }

    return () => clearTimeout(timerRef.current);

  }, [board, gameOver,difficulty]);

  // Computer vs Computer
  useEffect(() => {

    if(mode === "auto" && !gameOver){

        timerRef.current = setTimeout(()=>{
            computerMove(board);
        },600);

    }

    return () => clearTimeout(timerRef.current);

  }, [board, gameOver]);

  const handleReset = () => {

    clearTimeout(timerRef.current);


    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setXTurn(true);
    setGameOver(false);
  }

  const checkWinner = (newBoard)=>{

    const combinations=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    for(let i=0;i<combinations.length;i++){

      const [a,b,c] = combinations[i];

      if(
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ){
        return combinations[i];
      }

    }

    return null;
  }

  const computerMove = (currentBoard) => {

    if(gameOver) return;

    if(mode === "auto"){
      randomMove(currentBoard);
      return;
    }

    if(difficulty === "easy"){
      randomMove(currentBoard);
    }

    else if(difficulty === "medium"){
      mediumMove(currentBoard);
    }

    else if(difficulty === "hard"){
      minimaxMove(currentBoard);
    }

  }

  const randomMove = (currentBoard) => {

    const emptyCells = currentBoard
      .map((cell,index)=> cell === null ? index : null)
      .filter(val => val !== null);

    if(emptyCells.length === 0) return;

    const randomIndex =
      emptyCells[Math.floor(Math.random()*emptyCells.length)];

    handleClick(randomIndex);

  }

  const mediumMove = (currentBoard) => {

    for(let i=0;i<currentBoard.length;i++){

      if(currentBoard[i] === null){

        const copyBoard = [...currentBoard];
        copyBoard[i] = "O";

        if(checkWinner(copyBoard)){
          handleClick(i);
          return;
        }

      }

    }

    for(let i=0;i<currentBoard.length;i++){

      if(currentBoard[i] === null){

        const copyBoard = [...currentBoard];
        copyBoard[i] = "X";

        if(checkWinner(copyBoard)){
          handleClick(i);
          return;
        }

      }

    }

    randomMove(currentBoard);

  }

  const minimaxMove = (currentBoard) => {

    let bestScore = -Infinity;
    let move;

    for(let i=0;i<currentBoard.length;i++){

      if(currentBoard[i] === null){

        const copyBoard = [...currentBoard];
        copyBoard[i] = "O";

        let score = minimax(copyBoard,false);

        if(score > bestScore){
          bestScore = score;
          move = i;
        }

      }

    }

    handleClick(move);

  }

  const minimax = (boardState, isMaximizing) => {

    const result = checkWinner(boardState);

    if(result){
      const winnerPlayer = boardState[result[0]];

      if(winnerPlayer === "O") return 10;
      if(winnerPlayer === "X") return -10;
    }

    if(boardState.every(cell => cell !== null)){
      return 0;
    }

    if(isMaximizing){

      let bestScore = -Infinity;

      for(let i=0;i<boardState.length;i++){

        if(boardState[i] === null){

          const copyBoard = [...boardState];
          copyBoard[i] = "O";

          let score = minimax(copyBoard,false);

          bestScore = Math.max(score,bestScore);

        }

      }

      return bestScore;

    }

    else{

      let bestScore = Infinity;

      for(let i=0;i<boardState.length;i++){

        if(boardState[i] === null){

          const copyBoard = [...boardState];
          copyBoard[i] = "X";

          let score = minimax(copyBoard,true);

          bestScore = Math.min(score,bestScore);

        }

      }

      return bestScore;

    }

  }
const handleClick = (index) => {

  if(board[index] != null || gameOver){
    return;
  }

  const newBoard = [...board];
  newBoard[index] = isXTurn ? 'X' : 'O';

  setBoard(newBoard);
  setXTurn(!isXTurn);

  const winnerCombination = checkWinner(newBoard);

  // -------- WINNER CASE --------
  if(winnerCombination){

    clearTimeout(timerRef.current);

    setGameOver(true);
    setWinningLine(winnerCombination);

    const winPlayer = newBoard[winnerCombination[0]];

    // calculate new score locally
    const newScore = {
      ...score,
      [winPlayer]: score[winPlayer] + 1
    };

    setScore(newScore);

    setTimeout(()=>{

      if(currentMatch < totalMatches){

        // next match
        setCurrentMatch(prev => prev + 1);
        setBoard(Array(9).fill(null));
        setWinningLine(null);
        setXTurn(true);
        setGameOver(false);

      }
      else{

        // series finished
        let seriesWinner = "Draw";

        if(newScore.X > newScore.O){
          seriesWinner = mode === "ai" ? "Human" : "X";
        }
        else if(newScore.O > newScore.X){
          seriesWinner = mode === "ai" ? "Computer" : "O";
        }

        setWinner(seriesWinner);
      }

    },1500);

  }

  // -------- DRAW CASE --------
  if(!winnerCombination && newBoard.every(cell => cell !== null)){

    clearTimeout(timerRef.current);
    setGameOver(true);

    const newScore = {
      ...score,
      draw: score.draw + 1
    };

    setScore(newScore);

    setTimeout(()=>{

      if(currentMatch < totalMatches){

        setCurrentMatch(prev => prev + 1);
        setBoard(Array(9).fill(null));
        setWinningLine(null);
        setXTurn(true);
        setGameOver(false);

      }
      else{

        let seriesWinner = "Draw";

        if(newScore.X > newScore.O){
          seriesWinner = mode === "ai" ? "Human" : "X";
        }
        else if(newScore.O > newScore.X){
          seriesWinner = mode === "ai" ? "Computer" : "O";
        }

        setWinner(seriesWinner );

      }

    },1000);

  }

}

  const renderSquare = (index) => {

    const isWinningSquare =
      winningLine ? winningLine.includes(index) : false;

    return(

      <button
        className={`square ${isWinningSquare ? "winner-square":""}`}
        onClick={()=>handleClick(index)}
      >
        {board[index]}
      </button>

    )
  }

  if(winner){
  
  // let seriesWinner = "Draw";

  // if(score.X > score.O){
  //   seriesWinner = mode === "ai" ? "Human" : "X";
  // }
  // else if(score.O > score.X){
  //   seriesWinner = mode === "ai" ? "Computer" : "O";
  // }

  return (
    <WinnerScreen
      winner={winner}
      onReplay={() => window.location.reload()}
      goToHome={goToHome}
    />
  )
}

  return (
    <>

      <div className="score-board">

        <h3>Match {currentMatch} / {totalMatches}</h3>

        <div className="scores">

          {mode === "ai" ? (
            <>
              <span>Human : {score.X}</span>
              <span>Computer : {score.O}</span>
            </>
          ) : (
            <>
              <span>X : {score.X}</span>
              <span>O : {score.O}</span>
            </>
          )}

          <span>Draw : {score.draw}</span>

        </div>

      </div>

      <h2 className="turn-text">

        {mode === "ai"
          ? (isXTurn ? "Your Turn" : "Computer Turn")
          : (isXTurn ? "Player X Turn" : "Player O Turn")
        }

      </h2>

      <div className='board'>

        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>

        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>

        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>

      </div>

      <button onClick={handleReset}>Reset</button>

      <button className="back-btn" onClick={goToHome}>
        Back
      </button>

    </>
  )
}

export default TicTacToe