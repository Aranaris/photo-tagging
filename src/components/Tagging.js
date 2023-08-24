import "../styles/Tagging.css";
import GameInfo from "./GameInfo";
import Stopwatch from "./Stopwatch";
import Photo from "./Photo";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import firestore from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Tagging() {
    const [editMode, setEditMode] = useState(false);
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

    const editPhoto = () => {
        setEditMode(true);
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
        if (!editMode) {
            setPlayerScore(totalSeconds);
            pause();
            //TODO: update firestore with score for player and photo
        }
    }, [editMode, totalSeconds, pause])

    return (
        <div className="Tagging">
            <div className="page-header">
                Photo-Tagging
            </div>
            {(editMode) && <Stopwatch seconds={seconds} minutes={minutes}/>}
            {(!editMode) && <GameInfo playerScore={playerScore}/>}
            <div className="button-container">
                <button onClick={editPhoto}>Add Annotations</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
            {<Photo 
                photoTags={photoTags}
                setPhotoTags={setPhotoTags}
                editMode={editMode} 
                setEditMode={setEditMode}
                photo={currentPhoto} 
                totalSeconds={totalSeconds} 
            />}
            
        </div>
    )
}

export default Tagging;