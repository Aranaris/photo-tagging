import React, { useRef } from "react";
import firestore from "../firebase";
import {collection, query, orderBy, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import { useState } from "react";

function Home() {
    const [currentPlayer, setCurrentPlayer] = useState({});
    const inputName = useRef();
    const playerNameRef = collection(firestore, "players");

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            };
            try{
                setDoc(doc(playerNameRef, currentPlayerName), data);
                setCurrentPlayer(data);
            } catch(event) {
                console.log(event);
            }
        }
    };

    const handleClick = async () => {
        const playerQuery = query(playerNameRef, orderBy("name", "desc"));
        const querySnapshot = await getDocs(playerQuery);

        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
        
    }


    return (
        <div className="Home">
            <div className="page-header">Home Placeholder</div>
            <form onSubmit={handleSubmit}>
                <label>Player Name: </label>
                <input type="text" ref={inputName}></input>
                <input type="submit"></input>
            </form>
            <div className="welcome-message">Welcome {currentPlayer.name}</div>
            <button onClick={handleClick}>snapshot</button>
        </div>
    )
}

export default Home;
