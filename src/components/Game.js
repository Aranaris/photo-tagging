import "../styles/Game.css";
import displaycase from "../assets/BakeryDisplay1.jpg";

function Game() {
    return (
        <div className="Game">
            <div className="page-header">
                Game Header Placeholder
            </div>
            <div id="game-container">
                <img id="game-photo" src={displaycase} alt="current game"></img>
            </div>
        </div>
    )
}

export default Game;