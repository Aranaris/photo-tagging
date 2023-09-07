import "../styles/Tagging.css";
import GameInfo from "./GameInfo";
import Photo from "./Photo";
import { useEffect, useState } from "react";
import firestore from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import {QuerySnapshot, collection ,doc, getDoc, getDocs} from "firebase/firestore";

function Tagging() {
    const [editMode, setEditMode] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [imgSize, setImgSize] = useState({});
    const [photoTags, setPhotoTags] = useState([]);
    const imageLibraryRef = collection(firestore, "images");


    const editPhoto = () => {
        setEditMode(true);
        setPlayerScore(0);
        setCurrentImage("0035a5f752a459e1");
    }

    const getImages = async () => {
        const imageLibrarySnapshot = await getDocs(imageLibraryRef);
        imageLibrarySnapshot.forEach((image) => {
            console.log(image.id, " => ", image.data);
        });
    }

    useEffect( () => {
        async function getTags() {
            if (currentImage) {
                const docRef = doc(firestore, "images", currentImage);
                const photoSnapShot = await getDoc(docRef);
                const imageData = photoSnapShot.data();
                const retrievedTags = imageData.tags.map((tag) => {
                    tag["show"] = true;
                    return tag;
                })
                setPhotoTags(retrievedTags);
            }
        }
        getTags();
    }, [currentImage]);

    return (
        <div className="Tagging">
            <div className="page-header">
                Image Tagging
            </div>
            <div className="section-header">
                <div className="header-text"> &lt; &lt; Current Image: {currentImage} &gt; &gt; </div>
                <div className="button-container">
                    <button>Previous Image</button>
                    <button onClick={getImages}>Log all images</button>
                    <button onClick={editPhoto}>Display Image</button>
                    <button>Next Image</button>
                </div>
            </div>

            {(currentImage) && <Photo 
                photoTags={photoTags}
                setPhotoTags={setPhotoTags}
                editMode={editMode} 
                setEditMode={setEditMode}
                imageid = {currentImage}
                imgSize = {imgSize}
                setImgSize = {setImgSize}
            />}
            {(!editMode) && <GameInfo playerScore={playerScore}/>}
        </div>
    )
}

export default Tagging;