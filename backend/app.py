# ============================================================
#  app.py  —  the ENTRY POINT of the backend.
# ============================================================

from flask import Flask, jsonify
from flask_cors import CORS
from flask_session import Session
import os
# JWT

# Her fortælles at man gerne vil benytte sig routes fra users.py
# Den blueprint der er blevet lavet i den anden fil under api'er
from api.users import users_bp
from api.cars import cars_bp
from api.locations import locations_bp
from flask_jwt_extended import JWTManager

#import env loader
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_NAME"] = "wash_world_session"
app.config["JWT_SECRET_KEY"] = "..."


Session(app)
jwt = JWTManager(app)

CORS(app, supports_credentials=True, origins=os.getenv("FRONTEND_URL"))



# Her bliver blueprint registeret. Det er syntaksen for at den så kører på serveren.
# Det samme biver gjort med de andre moduler / filer der bliver oprettet.
app.register_blueprint(users_bp)
app.register_blueprint(cars_bp)
app.register_blueprint(locations_bp)

# upload files
UPLOAD_FOLDER = "./static/uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 2 * 512 * 512


# Til Flask docker health-check
@app.get("/health")
def health():
    return {"status": "ok", "volume_test": "updated live"}, 200

# making a change
