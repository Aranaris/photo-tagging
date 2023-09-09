import "../styles/Tagging.css";
import Photo from "./Photo";
import { useEffect, useState } from "react";
import firestore from "../firebase";
import {collection, doc, getDoc, getDocs, orderBy, query} from "firebase/firestore";

function Tagging() {
    const [editMode, setEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [imgSize, setImgSize] = useState({});
    const [photoTags, setPhotoTags] = useState([]);
    const [imageLibrary, setImageLibrary] = useState([]);

    const displayImage = () => {
        setEditMode(true);
        if (currentImage === null) {
            setCurrentImage(imageLibrary.length - 1);
        }
    }

    const firstImage = () => {
        if (currentImage > 0) {
            setCurrentImage(0);
        }
    }

    const previousImage = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        }
    }

    const nextImage = () => {
        if (currentImage < imageLibrary.length - 1) {
            setCurrentImage(currentImage + 1);
        }
    }

    const lastImage = () => {
        if (currentImage < imageLibrary.length - 1) {
            setCurrentImage(imageLibrary.length-1);
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
        if (imageLibrary[currentImage]) {
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
    }, [imageLibrary, currentImage]);

    let headerText = "";

    if (imageLibrary[currentImage]) {
        headerText = `Current Image: ${imageLibrary[currentImage]} (${currentImage + 1} of ${imageLibrary.length})`;
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
                    <button onClick={firstImage}>&lt; &lt;</button>
                    <button onClick={previousImage} disabled={currentImage === 0}>&lt; Previous Image</button>
                    <button onClick={displayImage}>Display Image</button>
                    <button onClick={nextImage} disabled={currentImage === imageLibrary.length-1}>Next Image &gt;</button>
                    <button onClick={lastImage}>&gt; &gt;</button>
                </div>
            </div>

            {(imageLibrary[currentImage]) && <Photo
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
