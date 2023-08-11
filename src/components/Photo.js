import "../styles/Photo.css";
import displaycase from "../assets/BakeryDisplay1.jpg";
import { useState } from "react";

function Photo(props) {
    const [clientClick, setClientClick] = useState(null);
    const [selectedTagCount, setSelectedTagCount] = useState(0);

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
        if (clientClick) {
            setClientClick(null);
        }
        
        for (let i = 0; i < props.photoTags.length; i++) {
            const tagData = props.photoTags[i];
            if (event.target.value === tagData.name && clientClick.x >= tagData.start[0] && clientClick.x <= tagData.end[0] && clientClick.y >= tagData.start[1] && clientClick.y <= tagData.end[1]) {
                tagData.show = true;
                const newTagArray = [...props.photoTags];
                newTagArray[i] = tagData;
                props.setPhotoTags(newTagArray);
                if (selectedTagCount+1 === props.photoTags.length) {
                    props.setEditMode(false);
                    setSelectedTagCount(0);
                } else {
                    setSelectedTagCount(selectedTagCount+1);
                }
                return;
            } 
        }

        console.log("nope!");
    }
    //TODO: update photo source retrieval (currently hardcoded in the startGame function Game.js)
    return (
        <div className="Photo">
            <img id="tag-photo" src={displaycase} alt="current to tag" onMouseDown={photoClick}></img> 
            {props.photoTags.map((tagData, key) => {
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
            <select size={props.photoTags.length} className="tag-dropdown" style={{
                top: clientClick.y, 
                left: clientClick.x
            }} onClick={dropdownSelect}>
                {props.photoTags.map((tagData, key) => {
                    return (
                        <option key={key}>{tagData.name}</option>
                    )
                })}
            </select>
            }
        </div>
    )
}

export default Photo;
