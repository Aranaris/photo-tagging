import "../styles/Photo.css";
import { useState } from "react";

function Photo(props) {
    const [clientClick, setClientClick] = useState(null);
    const [selectedTagCount, setSelectedTagCount] = useState(0);
    const img_url = `https://aranaris.github.io/image-repo/${props.imageid}.jpg`;

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

    const loadTags = (event) => {
        if (props.imageid) {
            const photoDim = event.target.getBoundingClientRect();
            photoDim.imageid = props.imageid;
            props.setImgSize(photoDim);
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
            <img id="tag-photo" src={img_url} alt="current to tag" onMouseDown={photoClick} onLoad={loadTags}></img> 
                {(props.imgSize['imageid'] == props.imageid) && props.photoTags.map((tagData, key) => {
                if (tagData.show) {
                    return (
                        <div className="photo-tag" key={key} style={{
                            top: `${props.imgSize.height*tagData.start[1]}px`,
                            height: `${props.imgSize.height*(tagData.end[1]-tagData.start[1])}px`,
                            left: `${props.imgSize.width*tagData.start[0]}px`,
                            width: `${props.imgSize.width*(tagData.end[0]-tagData.start[0])}px`,
                            // left: `${Math.round((props.imgSize.right - props.imgSize.left)*tagData.start[0])}px`,
                            // right: `${Math.round((props.imgSize.right - props.imgSize.left)*tagData.end[0])}px`,
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
