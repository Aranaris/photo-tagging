import "../styles/Tagging.css";
import GameInfo from "./GameInfo";
import Stopwatch from "./Stopwatch";
import Photo from "./Photo";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import firestore from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import {doc, getDoc} from "firebase/firestore";

function Tagging() {
    const [editMode, setEditMode] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
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
        setCurrentImage("0035a5f752a459e1");
        start();
    }

    // useEffect( () => {
    //     async function getTags() {
    //         if (currentPhoto) {
    //             const photoSnapShot = await getDocs(collection(firestore, "photos", currentPhoto, "tags"));
                
    //             const retrievedTags = photoSnapShot.docs.map((tag) => {
    //                 const tagData = tag.data();
    //                 tagData["name"] = tag.id;
    //                 tagData["show"] = false;
    //                 console.log("Tag Data: ", tagData);
    //                 return tagData;
    //             })
    //             setPhotoTags(retrievedTags);
    //         }
    //     }
    //     getTags();
    // }, [currentPhoto]);

    useEffect( () => {
        async function getTags() {
            if (currentImage) {
                const docRef = doc(firestore, "images", currentImage);
                const photoSnapShot = await getDoc(docRef);
                const imageData = photoSnapShot.data();
                const retrievedTags = imageData.tags.map((tag) => {
                    console.log(tag)
                    return tag;
                })
                setPhotoTags(retrievedTags);
            }
        }
        getTags();
    }, [currentImage]);

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
                imageid = {currentImage}
            />}
            {(!editMode) && <GameInfo playerScore={playerScore}/>}
        </div>
    )
}

export default Tagging;