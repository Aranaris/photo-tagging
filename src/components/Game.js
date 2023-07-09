import "../styles/Game.css";
import GameInfo from "./GameInfo";
import Photo from "./Photo";
import { useState } from "react";

function Game() {
    const [gameState, setGameState] = useState("not started");
    const [currentScore, setCurrentScore] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState("")

    const startGame = () => {
        setGameState("active");
        setCurrentScore(0);
        setCurrentPhoto("photo-1");
    }

    return (
        <div className="Game">
            <div className="page-header">
                Game Header Placeholder
            </div>
            <button onClick={startGame}>Start Game</button>
            {(gameState === "active") && <Photo gameState={gameState} photo={currentPhoto} />}
            <GameInfo currentScore={currentScore}/>
        </div>
    )
}

export default Game;