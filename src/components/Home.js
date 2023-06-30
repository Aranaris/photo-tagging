import React, { useRef } from "react";
import firestore from "../firebase";
import {addDoc, collection, getDocs} from "firebase/firestore";

function Home() {
    const nameRef = useRef();
    const playerName = collection(firestore, "name");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(nameRef.current.value);

        let data = {
            name: nameRef.current.value,
        };

        try{
            addDoc(playerName, data);
        } catch(event) {
            console.log(event);
        }
    };

    const handleClick = async () => {
        const querySnapshot = await getDocs(collection(firestore, "name"));
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
                <input type="text" ref={nameRef}></input>
                <input type="submit"></input>
            </form>
            <div className="welcome-message">Welcome {}</div>
            <button onClick={handleClick}>snapshot</button>
        </div>
    )
}

export default Home;
