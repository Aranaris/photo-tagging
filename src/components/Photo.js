import "../styles/Photo.css";
import displaycase from "../assets/BakeryDisplay1.jpg";
import firestore from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

function Photo() {
    const [photoTags, setPhotoTags] = useState([]);

    const getTags = async () => {
        const photoSnapShot = await getDocs(collection(firestore, "photos", "photo-1", "tags"));
        photoSnapShot.forEach((tag) => {
            const tagData = tag.data();
            tagData["name"] = tag.id;
            console.log("Tag Data: ", tagData);
            setPhotoTags([...photoTags, tagData]);
        })
    }

    const photoClick = (event) => {
        console.log('On Mousedown, clientX:', event.clientX)
        console.log('On Mousedown, clientY:', event.clientY)
        console.log('On Mousedown, ElementWidth:', event.target.getBoundingClientRect());
    }

    return (
        <div className="Photo">
            <img id="game-photo" src={displaycase} alt="current game" onMouseDown={photoClick}></img>
            {photoTags.map((tagData, key) => {
                return (
                    <div className="photo-tag" key={key} style={{top:tagData.start[1], left:tagData.start[0]}}
                    >{tagData.name}</div>
                )
            })}
            
            <button id="getTags" onClick={getTags}>Get tags</button>
        </div>
    )
}

export default Photo;
