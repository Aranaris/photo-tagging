import { useRef } from "react";
import firestore from "../firebase";
import {collection, query, orderBy, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import { useState } from "react";
import "../styles/Home.css";

function Home() {
    const [currentPlayer, setCurrentPlayer] = useState();
    const inputName = useRef();
    const playerNameRef = collection(firestore, "players");
    const [showPlayers, setShowPlayers] = useState(false);
    const [playerList, setPlayerList] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputName.current.value) {
            return;
        }

        let currentPlayerName = inputName.current.value;

        const currentPlayerRef = doc(firestore, "players", currentPlayerName);
        const currentPlayerSnap = await getDoc(currentPlayerRef);

        if (currentPlayerSnap.exists()) {
            console.log("Player Data: ", currentPlayerSnap.data());
            setCurrentPlayer(currentPlayerSnap.data());
        } else {
            console.log("Player not found, added to firestore");
            let data = {
                name: currentPlayerName,
                games: [{
                    photo: "photo-1",
                    score: 0,
                }],
            };
            try{
                setDoc(doc(playerNameRef, currentPlayerName), data);
                setCurrentPlayer(data);
            } catch(event) {
                console.log(event);
            }
        }
    };

    //TODO: move the show all playerList display with scores to the score tab
    const handleClick = async () => {
        const playerQuery = query(playerNameRef, orderBy("name", "desc"));
        const querySnapshot = await getDocs(playerQuery);
        if(!showPlayers) {
            const updatedList = [];
            querySnapshot.forEach((doc) => {
                updatedList.push(doc.data());
            });
            setPlayerList(updatedList);
        }
        setShowPlayers(!showPlayers);
    }


    return (
        <div className="Home">
            <div className="page-header">Player Setup</div>
            <form onSubmit={handleSubmit}>
                <label>Player Name: </label>
                <input type="text" ref={inputName}></input>
                <input type="submit"></input>
            </form>
            {currentPlayer && (
                <div className="current-player">
                    <div className="welcome-message">Welcome {currentPlayer.name}!</div>
                    <div className="current-player-info">Best Score: {currentPlayer.best_score}</div>
                </div>
            )}
            <button onClick={handleClick}>Show Player List (Firestore)</button>
            {showPlayers && (
                <li>
                    {playerList.map((player, key) => {
                        return (
                            <ol key={key}>{player.name} || Best Score: {player.best_score} seconds</ol>
                        )
                    })}
                </li>
            )
            }
        </div>
    )
}

export default Home;
