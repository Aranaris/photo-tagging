import "../styles/Game.css";
import GameInfo from "./GameInfo";
import Stopwatch from "./Stopwatch";
import Photo from "./Photo";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import firestore from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Game() {
    const [gameState, setGameState] = useState("not started");
    const [playerScore, setPlayerScore] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState(null)
    const [photoTags, setPhotoTags] = useState([]);

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
        setPlayerScore(0);
        setCurrentPhoto("photo-1");
        start();
    }

    useEffect( () => {
        async function getTags() {
            if (currentPhoto) {
                const photoSnapShot = await getDocs(collection(firestore, "photos", currentPhoto, "tags"));
                
                const retrievedTags = photoSnapShot.docs.map((tag) => {
                    const tagData = tag.data();
                    tagData["name"] = tag.id;
                    tagData["show"] = false;
                    console.log("Tag Data: ", tagData);
                    return tagData;
                })
                setPhotoTags(retrievedTags);
            }
        }
        getTags();
    }, [currentPhoto]);

    useEffect( () => {
        if (gameState === "completed") {
            setPlayerScore(totalSeconds);
            pause();
            //TODO: update firestore with score for player and photo
        }
    }, [gameState, totalSeconds, pause])

    return (
        <div className="Game">
            <div className="page-header">
                Photo-Tagging
            </div>
            {(gameState === "active") && <Stopwatch seconds={seconds} minutes={minutes}/>}
            {(gameState === "completed") && <GameInfo playerScore={playerScore}/>}
            <div className="button-container">
                <button onClick={startGame}>Start Game</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
            {(gameState !== "not started") && <Photo 
                photoTags={photoTags}
                setPhotoTags={setPhotoTags}
                gameState={gameState} 
                setGameState={setGameState}
                photo={currentPhoto} 
                totalSeconds={totalSeconds} 
            />}
            
        </div>
    )
}

export default Game;