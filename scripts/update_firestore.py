import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

cred = credentials.Certificate('./scripts/photo-tagging-70c04-c47de2960785.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

with open("./scripts/sample.json", "r") as infile:
    data = json.load(infile)

for image in data['images']:
    image_id = image['image']
    db.collection('images').document(image_id).set(image)
