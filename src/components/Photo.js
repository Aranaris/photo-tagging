import "../styles/Photo.css";
import displaycase from "../assets/BakeryDisplay1.jpg";
import firestore from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

function Photo(props) {
    const [photoTags, setPhotoTags] = useState([]);
    const [clientClick, setClientClick] = useState(null);

    const getTags = async () => { //TODO: refactor this function to be moved to Game.js
        const photoSnapShot = await getDocs(collection(firestore, "photos", props.photo, "tags"));
        
        const retrievedTags = photoSnapShot.docs.map((tag) => {
            const tagData = tag.data();
            tagData["name"] = tag.id;
            tagData["show"] = false;
            console.log("Tag Data: ", tagData);
            return tagData;
        })

        setPhotoTags(retrievedTags);
    }

    const photoClick = (event) => {
        if (clientClick) {
            setClientClick(null);
        } else {
            const elementData = event.target.getBoundingClientRect();
            setClientClick({
                x: event.clientX - elementData.x,
                y: event.clientY - elementData.y
            });    
        }
    }

    const dropdownSelect = (event) => {
        
        for (let i = 0; i < photoTags.length; i++) {
            const tagData = photoTags[i];
            if (event.target.value === tagData.name && clientClick.x >= tagData.start[0] && clientClick.x <= tagData.end[0] && clientClick.y >= tagData.start[1] && clientClick.y <= tagData.end[1]) {
                tagData.show = true;
                const newTagArray = [...photoTags];
                newTagArray[i] = tagData;
                setPhotoTags(newTagArray);
                return;
            } 
        }
        console.log("nope!");
    }

    return (
        <div className="Photo">
            <img id="game-photo" src={displaycase} alt="current game" onMouseDown={photoClick}></img>
            {photoTags.map((tagData, key) => {
                if (tagData.show) {
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
                } else {
                    return "";
                }
            })}
            {clientClick && 
            <select size={photoTags.length} className="tag-dropdown" style={{
                top: clientClick.y, 
                left: clientClick.x
            }} onClick={dropdownSelect}>
                {photoTags.map((tagData, key) => {
                    return (
                        <option key={key}>{tagData.name}</option>
                    )
                })}
            </select>
            }
            <button id="getTags" onClick={getTags}>Get tags</button>
        </div>
    )
}

export default Photo;
