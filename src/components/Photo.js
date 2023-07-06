import "../styles/Photo.css";
import displaycase from "../assets/BakeryDisplay1.jpg";
import firestore from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

function Photo() {
    const [photoTags, setPhotoTags] = useState([]);

    const getTags = async () => {
        const photoSnapShot = await getDocs(collection(firestore, "photos", "photo-1", "tags")); //TODO replace "photo-1"
        
        const newTags = photoSnapShot.docs.map((tag) => {
            const tagData = tag.data();
            tagData["name"] = tag.id;
            console.log("Tag Data: ", tagData);
            return tagData;
        })

        setPhotoTags([...photoTags, ...newTags]);
    }

    const photoClick = (event) => {
        const elementData = event.target.getBoundingClientRect()
        console.log('On Mousedown, ElementX:', event.clientX - elementData.x);
        console.log('On Mousedown, ElementY:', event.clientY - elementData.y);
    }

    return (
        <div className="Photo">
            <img id="game-photo" src={displaycase} alt="current game" onMouseDown={photoClick}></img>
            {photoTags.map((tagData, key) => {
                return (
                    <div className="photo-tag" key={key} style={{
                        top: tagData.start[1], 
                        left: tagData.start[0],
                        height: tagData.end[1] - tagData.start[1],
                        width: tagData.end[0] - tagData.start[0],
                    }}
                    >
                        <div className="tag-name">
                            {tagData.name}
                        </div>
                    </div>
                )
            })}
            
            <button id="getTags" onClick={getTags}>Get tags</button>
        </div>
    )
}

export default Photo;
