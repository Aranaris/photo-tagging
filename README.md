## Odin Project: Photo Tagging

https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app

Building a photo tagging application via React
(create-react-app)

Key Outcomes:
```
react-router-dom
Firebase - Firestore usage to manage data via a backend
CI via gh-actions
general react practice and improving familiarity
```

Images: From Google Open Images v6 dataset, data downloaded via FiftyOne

/fiftyone/open-images-v6/validation/

/data/ has all of the images with `image-id`.jpg
/labels/ has all of the annotated labels for each image in csv files. `classifications.csv` has imageid, source, labelname, confidence
`detections.csv` has imageid, source, labelname, confidence, xmin, xmax, ymin, ymax
ignoring the `/masks/`, `relationships.csv`, and `segmentations.csv` files for now.

/metadata/ has specific data around actual label names, the image sources themselves, and additional general info
`attributes.csv` and `segmentation_classes.csv` and `hierarchy.json` will be ignored for now.
`classes.csv` has the actual labelname and text association: labelname, classes
`image_ids.csv` has the image ids and associated image metadata: imageid, subset, originalurl, originallandingurl, license, authorprofileurl, author, title, originalsize, originalmd5, thumbnail300kurl, rotation



Deployed via gh-pages at https://aranaris.github.io/photo-tagging
