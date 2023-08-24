import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./photo-tagging-70c04-c47de2960785.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

print(cred, app, db)