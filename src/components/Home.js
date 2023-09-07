import { useRef } from "react";
import firestore from "../firebase";
import {collection, query, orderBy, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import { useState } from "react";
import "../styles/Home.css";

function Home() {
    const [currentUser, setCurrentUser] = useState();
    const inputName = useRef();
    const userNameRef = collection(firestore, "players");
    const [showUsers, setShowUsers] = useState(false);
    const [userList, setUserList] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputName.current.value) {
            return;
        }

        let currentUserName = inputName.current.value;

        const currentUserRef = doc(firestore, "players", currentUserName);
        const currentUserSnap = await getDoc(currentUserRef);

        if (currentUserSnap.exists()) {
            console.log("User Data: ", currentUserSnap.data());
            setCurrentUser(currentUserSnap.data());
        } else {
            console.log("User not found, added to firestore");
            let data = {
                name: currentUserName,
                games: [{
                    photo: "photo-1",
                    score: 0,
                }],
            };
            try{
                setDoc(doc(userNameRef, currentUserName), data);
                setCurrentUser(data);
            } catch(event) {
                console.log(event);
            }
        }
    };

    //TODO: move the show all playerList display with scores to the score tab
    const handleClick = async () => {
        const userQuery = query(userNameRef, orderBy("name", "desc"));
        const querySnapshot = await getDocs(userQuery);
        if(!showUsers) {
            const updatedList = [];
            querySnapshot.forEach((doc) => {
                updatedList.push(doc.data());
            });
            setUserList(updatedList);
        }
        setShowUsers(!showUsers);
    }


    return (
        <div className="Home">
            <div className="page-header">User Setup</div>
            <form onSubmit={handleSubmit}>
                <label>User Name: </label>
                <input type="text" ref={inputName}></input>
                <input type="submit"></input>
            </form>
            {currentUser && (
                <div className="current-user">
                    <div className="welcome-message">Welcome {currentUser.name}!</div>
                    <div className="current-user-info">Best Score: {currentUser.best_score}</div>
                </div>
            )}
            <button onClick={handleClick}>Show User List (Firestore)</button>
            {showUsers && (
                <li>
                    {userList.map((user, key) => {
                        return (
                            <ol key={key}>{user.name} || Best Score: {user.best_score} seconds</ol>
                        )
                    })}
                </li>
            )
            }
        </div>
    )
}

export default Home;
