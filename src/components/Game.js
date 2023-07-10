import "../styles/Game.css";
import GameInfo from "./GameInfo";
import Stopwatch from "./Stopwatch";
import Photo from "./Photo";
import { useState } from "react";
import { useStopwatch } from "react-timer-hook";

function Game() {
    const [gameState, setGameState] = useState("not started");
    const [currentScore, setCurrentScore] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState("")

    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
        totalSeconds,
    } = useStopwatch();

    const startGame = () => {
        setGameState("active");
        setCurrentScore(0);
        setCurrentPhoto("photo-1");
        start();
    }

    return (
        <div className="Game">
            <div className="page-header">
                Game Header Placeholder
            </div>
            <Stopwatch seconds={seconds} minutes={minutes}/>
            <div className="button-container">
                <button onClick={startGame}>Start Game</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
            {(gameState === "active") && <Photo gameState={gameState} photo={currentPhoto} totalSeconds={totalSeconds} currentScore={currentScore} setCurrentScore={setCurrentScore}/>}
            <GameInfo currentScore={currentScore}/>
        </div>
    )
}

export default Game;