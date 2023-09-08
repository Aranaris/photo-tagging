import "../styles/Tagging.css";
import Photo from "./Photo";
import { useEffect, useState } from "react";
import firestore from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import {collection ,doc, getDoc, getDocs, orderBy, query} from "firebase/firestore";

function Tagging() {
    const [editMode, setEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [imgSize, setImgSize] = useState({});
    const [photoTags, setPhotoTags] = useState([]);
    const [imageLibrary, setImageLibrary] = useState([]);

    const displayImage = () => {
        setEditMode(true);
        if (!currentImage && currentImage !== 0) {
            setCurrentImage(imageLibrary.length - 1);
        }
    }

    const nextImage = () => {
        if (currentImage < imageLibrary.length - 1) {
            setCurrentImage(currentImage + 1);
        }
    }

    const previousImage = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        }
    }

    const getImages = async () => {
        const imageLibraryRef = collection(firestore, "images");
        const q = query(imageLibraryRef, orderBy("created"));
        const imageLibrarySnapshot = await getDocs(q);

        const imagesArray = [];
        imageLibrarySnapshot.forEach((image) => {
            imagesArray.push(image.id)
        });
        setImageLibrary(imagesArray);
    }

    async function getTags() {
        if (currentImage || currentImage == 0) {
            const docRef = doc(firestore, "images", imageLibrary[currentImage]);
            const photoSnapShot = await getDoc(docRef);
            const imageData = photoSnapShot.data();
            const retrievedTags = imageData.tags.map((tag) => {
                tag["show"] = true;
                return tag;
            })
            setPhotoTags(retrievedTags);
        }
    }
    
    useEffect(() => {
        getImages();
    }, [] );

    useEffect(() => {
        getTags();
    }, [currentImage]);

    let headerText = "";
    
    if (imageLibrary[currentImage]) {
        headerText = `<< Current Image (${currentImage + 1} of ${imageLibrary.length}) : ${imageLibrary[currentImage]}>>`;
    } else {
        headerText = `No Image Loaded: (Click "Display Image" to start.)`;
    }
    

    return (
        <div className="Tagging">
            <div className="page-header">
                Image Tagging
            </div>
            <div className="section-header">
                <div className="header-text"> {headerText} </div>
                <div className="button-container">
                    <button onClick={previousImage}>Previous Image</button>
                    <button onClick={displayImage}>Display Image</button>
                    <button onClick={nextImage}>Next Image</button>
                </div>
            </div>

            {(currentImage || currentImage == 0) && <Photo 
                photoTags={photoTags}
                setPhotoTags={setPhotoTags}
                editMode={editMode} 
                setEditMode={setEditMode}
                imageid = {imageLibrary[currentImage]}
                imgSize = {imgSize}
                setImgSize = {setImgSize}
            />}
        </div>
    )
}

export default Tagging;